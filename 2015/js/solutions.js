import { readFileSync } from "fs";
import { performance } from "perf_hooks";
import days from "./days/days"

let totalTime = 0
let testSpeed = true
function Day(day, path, pause) {
	try {
		day.Tests()
	} catch (error) {
		console.log(`got: ${error.actual}, needed: ${error.expected}`)
	}
	if (pause) return
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
Day(days.day1, "../day-01/input");
Day(days.day2, "../day-02/input");
Day(days.day3, "../day-03/input");
// Day(days.day4, "../day-04/input");
Day(days.day5, "../day-05/input");
Day(days.day6, "../day-06/input");
Day(days.day7, "../day-07/input");
Day(days.day8, "../day-08/input");
Day(days.day9, "../day-09/input");
Day(days.day10, "../day-10/input");
Day(days.day11, "../day-11/input");
Day(days.day12, "../day-12/input");
Day(days.day13, "../day-13/input");
Day(days.day14, "../day-14/input");
Day(days.day15, "../day-15/input");
Day(days.day16, "../day-16/input");
Day(days.day17, "../day-17/input");
Day(days.day18, "../day-18/input");
Day(days.day19, "../day-19/input");
Day(days.day20, "../day-20/input");
Day(days.day21, "../day-21/input");
Day(days.day22, "../day-22/input");
Day(days.day23, "../day-23/input");
Day(days.day24, "../day-24/input");
Day(days.day25, "../day-25/input");
console.log(`All Days took: ${totalTime} ms to compute`)
