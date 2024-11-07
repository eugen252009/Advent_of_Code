import { readFileSync } from "fs";
import { performance } from "perf_hooks";
import day1 from "./day01.js";
import day2 from "./day02.js";
import day3 from "./day03.js";
import day4 from "./day04.js";
import day5 from "./day05.js";
import day6 from "./day06.js";
import day7 from "./day07.js";
import day8 from "./day08.js";
import day9 from "./day09.js";
import day10 from "./day10.js";
import day11 from "./day11.js";
import day12 from "./day12.js";
import day13 from "./day13.js";
import day14 from "./day14.js";
import day15 from "./day15.js";
import day16 from "./day16.js";
import day17 from "./day17.js";
import day18 from "./day18.js";
import day19 from "./day19.js";
import day20 from "./day20.js";
import day21 from "./day21.js";
import day22 from "./day22.js";
import day23 from "./day23.js";
import day24 from "./day24.js";
import day25 from "./day25.js";

let totalTime = 0
let testSpeed = true
function Day(day, path) {
	day.Tests()
	let input = readFileSync(path, "utf8").trimEnd()
	if (testSpeed) {
		const start = performance.now();
		const result1 = day.part1(input);
		const p1 = performance.now();
		const result2 = day.part2(input);
		const end = performance.now();
		totalTime += end - start
		if (result1 !== -1)
			console.log(`Day ${day.name} Part 1: ${result1} \ttook: ${Math.floor((p1 - start) * 10000) / 10000} ms`);
		if (result2 !== -1)
			console.log(`Day ${day.name} Part 2: ${result2} \ttook: ${Math.floor((end - p1) * 10000) / 10000} ms`);
	} else {
		const result1 = day.part1(input);
		const result2 = day.part2(input);
		if (result1 !== -1)
			console.log(`Day ${day.name} Part 1: ${result1}`);
		if (result2 !== -1)
			console.log(`Day ${day.name} Part 2: ${result2}`);
	}
}
Day(day1, "../day-01/input");
Day(day2, "../day-02/input");
Day(day3, "../day-03/input");
// Day(day4, "../day-04/input");
Day(day5, "../day-05/input");
Day(day6, "../day-06/input");
Day(day7, "../day-07/input");
Day(day8, "../day-08/input");
Day(day9, "../day-09/input");
Day(day10, "../day-10/input");
Day(day11, "../day-11/input");
Day(day12, "../day-12/input");
Day(day13, "../day-13/input");
Day(day14, "../day-14/input");
Day(day15, "../day-15/input");
Day(day16, "../day-16/input");
Day(day17, "../day-17/input");
Day(day18, "../day-18/input");
Day(day19, "../day-19/input");
Day(day20, "../day-20/input");
Day(day21, "../day-21/input");
Day(day22, "../day-22/input");
Day(day23, "../day-23/input");
Day(day24, "../day-24/input");
Day(day25, "../day-25/input");
console.log(`All Days took: ${totalTime} ms to compute`)
