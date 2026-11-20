import assert from "node:assert";
const testinput = `3   4\n4   3\n2   5\n1   3\n3   9\n3   3`;
function test() {
	try {
		assert.equal(part1(testinput), 11, "Part 1");
		assert.equal(part2(testinput), 31, "Part 2");
		// assert(part1(testinput) === 11, part1(testinput));
		// assert(31 === part2(testinput), part2(testinput));
	} catch (error) {
		console.log(
			`Testing error: ${error.message} got:${error.actual} needed:${error.expected} `,
		);
	}
}

function part1(input) {
	const data = input
		.split("\n")
		.map(
			(x) => x.split("   "),
		)
		.map((
			x,
		) => [parseInt(x[0]), parseInt(x[1])]);
	const left = [];
	const right = [];
	const lefter = {};
	const righter = {};
	let result = 0;

	for (const iter of data) {
		// add all Items to an Array/Map
		if (lefter[iter[0]] == undefined) lefter[iter[0]] = 1;
		else lefter[iter[0]]++;
		if (righter[iter[1]] == undefined) righter[iter[1]] = 1;
		else righter[iter[1]]++;

		left.push(iter[0]);
		right.push(iter[1]);

		right.sort();
		left.sort();
	}
	for (let index = 0; index < left.length; index++) {
		const element1 = left[index];
		const element2 = right[index];

		result += Math.abs(element1 - element2);
	}
	return result;
}

function part2(input) {
	const data = input
		.split("\n")
		.map(
			(x) => x.split("   "),
		)
		.map((
			x,
		) => [parseInt(x[0]), parseInt(x[1])]);
	const left = [];
	const right = [];
	const lefter = {};
	const righter = {};
	let result = 0;

	for (const iter of data) {
		// add all Items to an Array/Map
		if (lefter[iter[0]] == undefined) lefter[iter[0]] = 1;
		else lefter[iter[0]]++;
		if (righter[iter[1]] == undefined) righter[iter[1]] = 1;
		else righter[iter[1]]++;

		left.push(iter[0]);
		right.push(iter[1]);
	}
	for (let index = 0; index < left.length; index++) {
		const leftelement = left[index];
		result += leftelement * (righter[leftelement] ?? 0);
	}
	return result;
}
export default {
	part1,
	part2,
	test,
};
