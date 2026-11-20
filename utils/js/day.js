import { existsSync, readFileSync } from "node:fs";

export function printHead() {
	console.log("Day     | Part 1   | Part 2");
	console.log("--------------------------");
}
export class Day {
	input = "";
	testSpeed = false;
	accumulatedTime = 0;
	result1 = -1;
	result2 = -1;
	part1Time = 0;
	part2Time = 0;
	part1 = undefined;
	part2 = undefined;
	day = 1;
	year = 2024;

	constructor({ part1, part2, test }, { year, day }) {
		this.day = day;
		this.year = year;
		let path = "";
		if (day < 10) {
			path = `./inputs/${year}/day-0${day}/input`;
		} else {
			path = `./inputs/${year}/day-${day}/input`;
		}
		if (!existsSync(path)) {
			console.log("Error while loading File: is it Missing?")
			return;
		}
		try {
			this.input = readFileSync(path, "utf8").trimEnd();
		} catch (_e) {
			// This File was not found
			// its skipped because its maybe not available yet.
			// or it needs to be solved
		}
		if (typeof part1 === "function") {
			// if (typeof (part1) undefined) {
			this.part1 = part1;
		}
		// }
		if (typeof part2 === "function") {
			this.part2 = part2;
		}
		if (test != undefined) {
			test();
		}
	}
	execute() {
		//Execute all Parts and measure the Times
		if (this.part1 !== undefined) {
			const start = performance.now();
			this.result1 = this.part1(this.input);
			const checkpoint = performance.now();
			this.part1Time = checkpoint - start;
		}
		if (this.part2 !== undefined) {
			const checkpoint = performance.now();
			this.result2 = this.part2(this.input);
			const end = performance.now();
			this.part2Time = end - checkpoint;
		}
		//extract the Times and save it into a variable
		this.accumulatedTime = this.part1Time + this.part2Time;

		return this;
	}
	getResults() {
		return {
			result1: this.result1,
			result2: this.result2,
			part1Time: this.part1Time,
			part2Time: this.part2Time,
			accumulatedTime: this.accumulatedTime,
		};
	}
	print() {
		console.log(
			`Day ${this.day} | ${this.result1} | ${this.result2}`,
		);
	}
}

export default Day;
