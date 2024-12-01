import { Day } from "../../utils/js/day"
import days from "./days/days";

const results = [
	new Day(days.day1, "../day-01/input").execute(),
	new Day(days.day2, "../day-02/input").execute(),
	new Day(days.day3, "../day-03/input").execute(),
	new Day(days.day4, "../day-04/input"),
	new Day(days.day5, "../day-05/input").execute(),
	new Day(days.day6, "../day-06/input").execute(),
	new Day(days.day7, "../day-07/input").execute(),
	new Day(days.day8, "../day-08/input").execute(),
	new Day(days.day9, "../day-09/input").execute(),
	new Day(days.day10, "../day-10/input").execute(),
	new Day(days.day11, "../day-11/input").execute(),
	new Day(days.day12, "../day-12/input").execute(),
	new Day(days.day13, "../day-13/input").execute(),
	new Day(days.day14, "../day-14/input").execute(),
	new Day(days.day15, "../day-15/input").execute(),
	new Day(days.day16, "../day-16/input").execute(),
	new Day(days.day17, "../day-17/input").execute(),
	new Day(days.day18, "../day-18/input").execute(),
	new Day(days.day19, "../day-19/input").execute(),
	new Day(days.day20, "../day-20/input").execute(),
	new Day(days.day21, "../day-21/input").execute(),
	new Day(days.day22, "../day-22/input").execute(),
	new Day(days.day23, "../day-23/input").execute(),
	new Day(days.day24, "../day-24/input").execute(),
	new Day(days.day25, "../day-25/input").execute(),
]

for (let index = 0; index < results.length; index++) {
	const element = results[index];
	const day = index + 1
	console.log(`Day ${day < 10 ? "0" + day : day} took: \t${Math.floor(element.accumulatedTime * 100) / 100} ms`)
}


console.log()
console.log(`All Part1 took: ${Math.round(results.reduce((acc, x) => { return acc + x.part1Time ?? 0 }, 0) * 100) / 100} ms to compute`)
console.log(`All Part2 took: ${Math.round(results.reduce((acc, x) => { return acc + x.part2Time ?? 0 }, 0) * 100) / 100} ms to compute`)
console.log(`All Days took: ${Math.round(results.reduce((acc, x) => { return acc + x.accumulatedTime ?? 0 }, 0) * 100) / 100} ms to compute`)
