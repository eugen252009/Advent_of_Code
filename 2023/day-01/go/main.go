package main

import (
	"fmt"
	"os"
	"runtime/pprof"
)

var filename = "../input.bak"

func main() {
	f, err := os.Create("cpu_profile.prof")
	if err != nil {
		panic(err)
	}
	defer f.Close()
	if err := pprof.StartCPUProfile(f); err != nil {
		panic(err)
	}
	defer pprof.StopCPUProfile()
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer file.Close()
	sum := 0
	var carry []byte
	for {
		data := make([]byte, 256)
		n, err := file.Read(data)
		if n <= 0 {
			break
		}
		if err != nil {
			panic(err)
		}

		lastid := 0
		rawdata := append(carry, data[:n]...) // Append only the filled portion of data
		for id, val := range rawdata {
			if val == '\n' {
				if id == 0 {
					lastid = 0
				}
				somesum := part1(rawdata[lastid:id])
				fmt.Println(somesum)
				sum += somesum
				lastid = id + 1 // Move lastid to the next position after the newline character
			}
		}
		carry = rawdata[lastid:]
	}

	fmt.Println(sum)
}

func part1(data []byte) int {
	var right = -1
	var left = -1
	for _, val := range data {
		if val >= '0' && val <= '9' {
			if left == -1 {
				left = int(val)
			}
			right = int(val)
		}
	}
	if right == -1 || left == -1 {
		return 0
	}
	fmt.Print((left - '0'), right-'0')
	return (left-'0')*10 + right - '0'
}
