.PHONY: build run test

build:
	go build -o ../getPuzzle .

# Example: make -C fetchPuzzles run ARGS='-year 2015 -day 3'
run:
	go run . -output ../days -cookie ../cookie $(ARGS)

test:
	go test ./...
	go vet ./...
