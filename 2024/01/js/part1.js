import { ok } from "node:assert";
import fs from "node:fs";

const data = fs.readFileSync("input.txt").toString().split("").filter((x) => x)
	.join("");
const testcase1 = `3   4
4   3
2   5
1   3
3   9
3   3`;
const testcase2 = `3   1`;

const Tests = [
	11 === solve(testcase1),
	2 === solve(testcase2),
];

for (let i = 0; i < Tests.length; i++) {
	ok(Tests[i], `Test ${i + 1} failed`);
}
console.log(solve(data));

function solve(data, distance = 11) {
	const left = [];
	const right = [];

	data.split("\n").filter((x) => x).forEach((row) => {
		const [leftside, rightside] = row.split("   ");
		left.push(parseInt(leftside));
		right.push(parseInt(rightside));
	});

	left.sort((x, y) => x - y);
	right.sort((x, y) => x - y);
	distance = left.reduce(
		(calcdistance, leftitem, id) =>
			calcdistance + Math.abs(right[id] - leftitem),
		0,
	);
	return distance;
}
