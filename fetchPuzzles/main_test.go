package main

import (
	"context"
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestOptions(t *testing.T) {
	cases := []struct {
		name   string
		args   []string
		branch string
		fail   bool
	}{
		{"branch", []string{"03"}, "2024", false},
		{"flags", []string{"-day", "3", "-year", "2024"}, "main", false},
		{"legacy", []string{"3", "2024"}, "main", false},
		{"legacy-year", []string{"2024"}, "main", false},
		{"missing-year", []string{"03"}, "main", true},
		{"mismatch", []string{"-day", "3", "-year", "2023"}, "2024", true},
		{"zero", []string{"0", "2024"}, "main", true},
		{"too-large", []string{"26", "2024"}, "main", true},
		{"mixed", []string{"-year", "2024", "03"}, "main", true},
		{"all-and-day", []string{"-year", "2024", "-day", "3", "-all"}, "main", true},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			o, err := parseOptions(tc.args, tc.branch, io.Discard)
			if (err != nil) != tc.fail {
				t.Fatalf("options=%+v error=%v", o, err)
			}
			if err == nil && o.output != "days" {
				t.Fatalf("wrong layout: %s", o.output)
			}
		})
	}
}

func TestPuzzleArticlesAndPermissions(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("User-Agent") == "" {
			t.Error("missing user agent")
		}
		if strings.HasSuffix(r.URL.Path, "/input") {
			w.Write([]byte("new input\n"))
			return
		}
		w.Write([]byte(`<article>ignore</article><article class="day-desc"><h2>Part 1</h2><a href="/2024">link</a></article><article class="day-desc"><h2>Part 2</h2></article>`))
	}))
	defer server.Close()
	dir := t.TempDir()
	if err := downloadDay(context.Background(), server.Client(), server.URL, "session=test", dir, 2024, 3); err != nil {
		t.Fatal(err)
	}
	readme, _ := os.ReadFile(filepath.Join(dir, "day-03/README.md"))
	for _, part := range []string{"Part 1", "Part 2", server.URL + "/2024"} {
		if !strings.Contains(string(readme), part) {
			t.Fatalf("missing %q in %s", part, readme)
		}
	}
	if strings.Contains(string(readme), "ignore") {
		t.Fatal("unrelated article included")
	}
	stat, err := os.Stat(filepath.Join(dir, "day-03/input"))
	if err != nil || stat.Mode().Perm() != 0600 {
		t.Fatalf("input permissions: %v %v", stat, err)
	}
	entries, _ := os.ReadDir(filepath.Join(dir, "day-03"))
	if len(entries) != 2 {
		t.Fatal("temporary files left behind")
	}
	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	if err := downloadDay(ctx, server.Client(), server.URL, "session=test", dir, 2024, 3); err == nil {
		t.Fatal("cancelled context accepted")
	}
}

func TestCookie(t *testing.T) {
	for _, value := range []string{"test", "session=test", " session=test\n"} {
		got, err := normalizeCookie(value)
		if err != nil || got != "session=test" {
			t.Fatalf("cookie: %q %v", got, err)
		}
	}
	for _, value := range []string{"", "session=", "session=test;other=secret", "test\ninjected"} {
		if _, err := normalizeCookie(value); err == nil {
			t.Fatal("accepted malformed cookie")
		}
	}
}

func TestDownloadPreservesExistingOnFailure(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if strings.HasSuffix(r.URL.Path, "/input") {
			w.Write([]byte("new input"))
			return
		}
		w.Write([]byte("<html>login</html>"))
	}))
	defer server.Close()
	dir := t.TempDir()
	folder := filepath.Join(dir, "day-03")
	os.Mkdir(folder, 0755)
	for _, name := range []string{"input", "README.md"} {
		os.WriteFile(filepath.Join(folder, name), []byte("keep"), 0644)
	}
	if err := downloadDay(context.Background(), server.Client(), server.URL, "session=test", dir, 2024, 3); err == nil {
		t.Fatal("expected error")
	}
	for _, name := range []string{"input", "README.md"} {
		data, _ := os.ReadFile(filepath.Join(folder, name))
		if string(data) != "keep" {
			t.Fatal("modified existing file")
		}
	}
}

func TestDownloadDay(t *testing.T) {
	for _, mode := range []string{"success", "http-error", "missing-article", "html-input", "empty-input"} {
		t.Run(mode, func(t *testing.T) {
			server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				if r.Header.Get("Cookie") != "session=test" {
					t.Error("missing cookie")
				}
				if mode == "http-error" {
					http.Error(w, "locked", 404)
					return
				}
				if strings.HasSuffix(r.URL.Path, "/input") {
					if mode == "html-input" {
						w.Write([]byte("<!DOCTYPE html><html>login</html>"))
						return
					}
					if mode == "empty-input" {
						return
					}
					w.Write([]byte("example\n"))
					return
				}
				if mode == "missing-article" {
					w.Write([]byte("login"))
					return
				}
				w.Write([]byte("<nav>ignore</nav><article class=" + "\"day-desc\"" + "><h2>Day 3</h2><p>Puzzle</p></article>"))
			}))
			defer server.Close()
			dir := t.TempDir()
			err := downloadDay(context.Background(), server.Client(), server.URL, "session=test", dir, 2024, 3)
			if mode != "success" {
				if err == nil {
					t.Fatal("expected error")
				}
				if _, err := os.Stat(filepath.Join(dir, "day-03")); !os.IsNotExist(err) {
					t.Fatal("error created output")
				}
				return
			}
			if err != nil {
				t.Fatal(err)
			}
			input, err := os.ReadFile(filepath.Join(dir, "day-03/input"))
			if err != nil || string(input) != "example\n" {
				t.Fatalf("input: %q, %v", input, err)
			}
			readme, err := os.ReadFile(filepath.Join(dir, "day-03/README.md"))
			if err != nil || !strings.Contains(string(readme), "Puzzle") || strings.Contains(string(readme), "ignore") {
				t.Fatalf("readme: %q, %v", readme, err)
			}
		})
	}
}
