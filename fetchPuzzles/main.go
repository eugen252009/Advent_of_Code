package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	md "github.com/JohannesKaufmann/html-to-markdown"
)

func main() {
	parsedyear, err := strconv.Atoi(os.Args[1])
	if err != nil {
		panic(err.Error())
	}
	argc := len(os.Args)
	if argc == 2 {
		for i := 1; i < 26; i++ {
			downloadDay(parsedyear, i)
		}
		fmt.Println(os.Args)
	} else if argc > 2 && argc < 4 {
		parsedyear, err := strconv.Atoi(os.Args[1])
		parsedday, err := strconv.Atoi(os.Args[2])
		if err != nil {
			panic(err.Error())
		}
		downloadDay(parsedyear, parsedday)
	}
}
func downloadDay(year int, day int) {
	cookiebytes, _ := os.ReadFile("cookie")
	cookie := strings.TrimSpace(string(cookiebytes))

	url := fmt.Sprintf("https://adventofcode.com/%d/day/%d/input", year, day)
	data, err := downloadFile(url, cookie)
	if err != nil {
		fmt.Println("Error occured while attempting to download", err)
	}
	os.MkdirAll(fmt.Sprintf("./%d/day-%02d", year, day), 0775)
	os.WriteFile(fmt.Sprintf("./%d/day-%02d/input", year, day), data, 0664)

	// Downlaoding Readme
	url2 := fmt.Sprintf("https://adventofcode.com/%d/day/%d", year, day)
	file, _ := downloadFile(url2, cookie)
	tmp := parsemd(string(file))
	split1 := strings.Join(strings.Split(tmp, "##")[1:], "")
	split2 := strings.Split(split1, "To begin, [get your puzzle input]")[0]
	finaldata := "## " + split2
	os.WriteFile(fmt.Sprintf("./%02d/day-%02d/Readme.md", year, day), []byte(finaldata), 0664)
}

func downloadFile(url, cookie string) ([]byte, error) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println("Error creating request:", err)
		return nil, err
	}
	req.Header.Set("Cookie", cookie)
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		fmt.Println("Error: Unexpected status code", resp.Status)
		return nil, err
	}
	bytes, err := io.ReadAll(resp.Body)
	defer resp.Body.Close()
	return bytes, err
}

func parsemd(html string) string {
	converter := md.NewConverter("", true, nil)
	markdown, err := converter.ConvertString(html)
	if err != nil {
		log.Fatal(err)
	}
	return markdown
}
