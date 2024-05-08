run: build
	@./build/part1
	@./build/part2

build:
	mkdir build
	@sed -i 's/define Part 2/define Part 1/' src/solution.cpp
	@g++ -O3 -o ./build/part1 src/solution.cpp
	@sed -i 's/define Part 1/define Part 2/' src/solution.cpp
	@g++ -O3 -o ./build/part2 src/solution.cpp

bench:
	@perf record --call-graph dwarf ./build/part1
	@perf report 
	@perf record --call-graph dwarf ./build/part2
	@perf report 

clean:
	rm -rf build
