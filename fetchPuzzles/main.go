package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"io"
	"net/http"
	neturl "net/url"
	"os"
	"os/exec"
	"os/signal"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	md "github.com/JohannesKaufmann/html-to-markdown"
	"github.com/PuerkitoBio/goquery"
)

const maxResponseBytes = 10 << 20

type options struct {
	year, day      int
	all            bool
	output, cookie string
}

func main() {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()
	if err := run(ctx, os.Args[1:], os.Stdout); err != nil {
		if errors.Is(err, flag.ErrHelp) {
			return
		}
		fmt.Fprintln(os.Stderr, "Fehler:", err)
		os.Exit(1)
	}
}

func parseOptions(args []string, branch string, out io.Writer) (options, error) {
	o := options{}
	fs := flag.NewFlagSet("getPuzzle", flag.ContinueOnError)
	fs.SetOutput(out)
	fs.IntVar(&o.year, "year", 0, "Jahr (Standard: aktueller Jahres-Branch)")
	fs.IntVar(&o.day, "day", 0, "Tag 1–25")
	fs.BoolVar(&o.all, "all", false, "Alle 25 Tage laden (nur für abgeschlossene Jahre)")
	fs.StringVar(&o.output, "output", "days", "Zielverzeichnis relativ zum Arbeitsverzeichnis")
	fs.StringVar(&o.cookie, "cookie", "cookie", "Datei mit session=DEIN_WERT")
	fs.Usage = func() {
		fmt.Fprintln(out, "Usage: getPuzzle -day 3 [-year 2024]\n       getPuzzle 03 | getPuzzle TAG JAHR | getPuzzle JAHR\nFlags müssen vor Positionsargumenten stehen.")
		fs.PrintDefaults()
	}
	if len(args) == 1 && (args[0] == "h" || args[0] == "?") {
		fs.Usage()
		return o, flag.ErrHelp
	}
	if err := fs.Parse(args); err != nil {
		return o, err
	}
	positional := fs.Args()
	if len(positional) > 0 {
		if o.year != 0 || o.day != 0 || o.all {
			return o, fmt.Errorf("Positionsargumente nicht mit -year, -day oder -all mischen")
		}
		number, err := strconv.Atoi(positional[0])
		if err != nil {
			return o, fmt.Errorf("Tag oder Jahr muss eine Zahl sein")
		}
		switch len(positional) {
		case 1:
			if number >= 2015 {
				o.year = number
				o.all = true
			} else {
				o.day = number
			}
		case 2:
			o.day = number
			o.year, err = strconv.Atoi(positional[1])
			if err != nil {
				return o, fmt.Errorf("ungültiges Jahr")
			}
		default:
			return o, fmt.Errorf("zu viele Argumente")
		}
	}
	branchYear, _ := strconv.Atoi(branch)
	if branchYear >= 2015 && branchYear <= 2099 {
		if o.year != 0 && o.year != branchYear {
			return o, fmt.Errorf("Jahr %d passt nicht zum Branch %s", o.year, branch)
		}
		o.year = branchYear
	}
	if o.year < 2015 || o.year > 2099 {
		return o, fmt.Errorf("Jahres-Branch verwenden oder -year zwischen 2015 und 2099 angeben")
	}
	if o.all && o.day != 0 {
		return o, fmt.Errorf("-all und -day schließen sich aus")
	}
	if !o.all && (o.day < 1 || o.day > 25) {
		return o, fmt.Errorf("Tag muss zwischen 1 und 25 liegen")
	}
	if o.all && o.year >= time.Now().Year() {
		return o, fmt.Errorf("-all nur für abgeschlossene Jahre verwenden; aktuelle Tage einzeln laden")
	}
	if strings.TrimSpace(o.output) == "" {
		return o, fmt.Errorf("Zielverzeichnis darf nicht leer sein")
	}
	return o, nil
}

func run(ctx context.Context, args []string, out io.Writer) error {
	branch, _ := exec.CommandContext(ctx, "git", "branch", "--show-current").Output()
	o, err := parseOptions(args, strings.TrimSpace(string(branch)), out)
	if err != nil {
		return err
	}
	cookie, err := os.ReadFile(o.cookie)
	if err != nil {
		return fmt.Errorf("Cookie lesen: %w", err)
	}
	session, err := normalizeCookie(string(cookie))
	if err != nil {
		return err
	}
	client := &http.Client{Timeout: 30 * time.Second, CheckRedirect: func(req *http.Request, via []*http.Request) error {
		return fmt.Errorf("unerwartete HTTP-Weiterleitung; Session und Freischaltung prüfen")
	}}
	first, last := o.day, o.day
	if o.all {
		first, last = 1, 25
	}
	for day := first; day <= last; day++ {
		if err := downloadDay(ctx, client, "https://adventofcode.com", session, o.output, o.year, day); err != nil {
			return fmt.Errorf("Tag %02d: %w", day, err)
		}
		fmt.Fprintln(out, "Geladen:", filepath.Join(o.output, fmt.Sprintf("day-%02d", day)))
		// Avoid hammering AoC when fetching an entire year.
		if day < last {
			select {
			case <-ctx.Done():
				return ctx.Err()
			case <-time.After(2 * time.Second):
			}
		}
	}
	return nil
}

func normalizeCookie(raw string) (string, error) {
	raw = strings.TrimSpace(raw)
	value := strings.TrimPrefix(raw, "session=")
	if value == "" || strings.ContainsAny(value, " \t\r\n;") {
		return "", fmt.Errorf("Cookie muss einen einzelnen Session-Wert enthalten (optional session=)")
	}
	for _, r := range value {
		if r < 33 || r > 126 {
			return "", fmt.Errorf("ungültige Zeichen im Session-Cookie")
		}
	}
	return "session=" + value, nil
}

func downloadDay(ctx context.Context, client *http.Client, host, cookie, output string, year, day int) error {
	url := fmt.Sprintf("%s/%d/day/%d", host, year, day)
	input, err := downloadFile(ctx, client, url+"/input", cookie)
	if err != nil {
		return err
	}
	if len(strings.TrimSpace(string(input))) == 0 || strings.HasPrefix(strings.ToLower(strings.TrimSpace(string(input))), "<!doctype html") || strings.HasPrefix(strings.ToLower(strings.TrimSpace(string(input))), "<html") {
		return fmt.Errorf("leerer Input oder HTML statt Input; Session prüfen")
	}
	html, err := downloadFile(ctx, client, url, cookie)
	if err != nil {
		return err
	}
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(string(html)))
	if err != nil {
		return err
	}
	baseURL, err := neturl.Parse(url)
	if err != nil {
		return err
	}
	doc.Find("article.day-desc [href], article.day-desc [src]").Each(func(_ int, s *goquery.Selection) {
		for _, attr := range []string{"href", "src"} {
			if value, ok := s.Attr(attr); ok {
				if relative, err := neturl.Parse(value); err == nil {
					s.SetAttr(attr, baseURL.ResolveReference(relative).String())
				}
			}
		}
	})
	articles := []string{}
	doc.Find("article.day-desc").Each(func(_ int, s *goquery.Selection) {
		h, e := goquery.OuterHtml(s)
		if e == nil {
			articles = append(articles, h)
		}
	})
	if len(articles) == 0 {
		return fmt.Errorf("keine Aufgabenbeschreibung gefunden; keine Dateien geschrieben")
	}
	// Links have already been resolved against the actual page URL.
	markdown, err := md.NewConverter("", true, nil).ConvertString(strings.Join(articles, "\n"))
	if err != nil {
		return err
	}
	dir := filepath.Join(output, fmt.Sprintf("day-%02d", day))
	if err := os.MkdirAll(dir, 0755); err != nil {
		return err
	}
	// Stage both files before replacing either. Each rename is atomic; the pair is not a filesystem transaction.
	inputTemp, err := stageFile(dir, input, 0600)
	if err != nil {
		return err
	}
	defer os.Remove(inputTemp)
	readmeTemp, err := stageFile(dir, []byte(markdown+"\n"), 0644)
	if err != nil {
		return err
	}
	defer os.Remove(readmeTemp)
	if err := os.Rename(inputTemp, filepath.Join(dir, "input")); err != nil {
		return err
	}
	return os.Rename(readmeTemp, filepath.Join(dir, "README.md"))
}

func stageFile(dir string, data []byte, mode os.FileMode) (string, error) {
	f, err := os.CreateTemp(dir, ".fetch-*")
	if err != nil {
		return "", err
	}
	name := f.Name()
	if err = f.Chmod(mode); err == nil {
		_, err = f.Write(data)
	}
	closeErr := f.Close()
	if err == nil {
		err = closeErr
	}
	if err != nil {
		os.Remove(name)
		return "", err
	}
	return name, nil
}

func downloadFile(ctx context.Context, client *http.Client, url, cookie string) ([]byte, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Cookie", cookie)
	req.Header.Set("User-Agent", "Advent_of_Code puzzle downloader (github.com/eugen252009/Advent_of_Code)")
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		hint := ""
		switch resp.StatusCode {
		case 400, 401, 403:
			hint = "; Session prüfen"
		case 404:
			hint = "; Jahr/Tag und Freischaltung prüfen"
		case 429:
			hint = "; Abruflimit erreicht, später erneut versuchen"
		}
		return nil, fmt.Errorf("HTTP %s%s", resp.Status, hint)
	}
	data, err := io.ReadAll(io.LimitReader(resp.Body, maxResponseBytes+1))
	if err != nil {
		return nil, err
	}
	if len(data) > maxResponseBytes {
		return nil, fmt.Errorf("Antwort größer als 10 MiB")
	}
	return data, nil
}
