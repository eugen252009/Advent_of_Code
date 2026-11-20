package main

import (
	"os"
	"strconv"
	"strings"
	"testing"
)

func TestMain(t *testing.T) {
	file, err := os.ReadFile("../input")
	if err != nil {
		panic(err)
	}
	sum := 0
	arr := strings.Split(string(file), "\n")
	for _, val := range arr {
		sum += part1([]byte(val))
	}
	t.Logf(strconv.Itoa(sum))
}
