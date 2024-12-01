import assert from "node:assert";
import fs from "node:fs";

function buildString(arr) {
	let res = "";
	for (const iter of arr)
		res += "#".repeat(iter) + "."
	return res.slice(0, -1);
}

function check(arr1, arr2) {
	if (arr1.length !== arr2.length) return false
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false
	}
	return true
}

function parse(input) {
	return input.split(".").filter(x => x).map(x => x.length)
}
export class Springs {
	springText = "";
	normalizedText = "";
	numbers = [];
	constructor(input, numbers) {
		this.springText = input;
		this.normalizedText = input.split(".").filter(y => y).join(".");
		this.numbers = numbers;
	}

	[Symbol.iterator] = function* depthFirst() {
		yield this.depth()
		return
	}
	depth(input = this.springText, memo = {}) {
		if (input in memo) return memo[input];
		let total = 0;
		if (!input.includes("?")) {
			if (check(parse(input), this.numbers)) {
				// console.log("1")
				return 1;
			} else {
				// console.log("0")
				return 0;
			}
		}
		const key = input;
		if (memo[key] === undefined) {
			memo[key] = 0
			// console.log("Save");
		}
		else {
			console.log("HIT");
			return memo[key]
		}
		total += this.depth(input.replace("?", "#"), memo);
		total += this.depth(input.replace("?", "."), memo);
		memo[key] += total;
		// console.log(Object.keys(memo).length)
		return total;
	}

	unfold() {
		this.springText = (this.springText + "?").repeat(5).slice(0, -1);
		this.normalizedText = this.springText.split(".").filter(y => y).join(".");
		this.numbers = [
			...this.numbers,
			...this.numbers,
			...this.numbers,
			...this.numbers,
			...this.numbers,
		];
		return this;
	}
}


// const data = fs
// 	.readFileSync("../testinput.txt", "utf8")
// 	.split("\n")
// 	.filter(x => x)
// 	.map(x =>
// 		new Springs(
// 			x.split(" ")?.at(0),
// 			x.split(" ")?.at(1)?.split(",").map(parseInt),
// 		));

//Tests
const test1 = new Springs("???.###", [1, 1, 3]);
const test2 = new Springs(".??..??...?##.", [1, 1, 3]);
const test3 = new Springs("?#?#?#?#?#?#?#?", [1, 3, 1, 6]);
const test4 = new Springs("????.#...#...", [4, 1, 1]);
const test5 = new Springs("????.######..#####.", [1, 6, 5]);
const test6 = new Springs("?###????????", [3, 2, 1]);
const allSprings = [test1, test2, test3, test4, test5, test6];
function Test(spring, result) {
	let res = 0;
	for (const iter of spring.unfold()) {
		if (test1.check(iter)) res++
	}
	assert(res === result,
		`needed: ${result}, got: ${res}`);
}
// Test(test1, 1);
// Test(test2, 16384);
// Test(test3, 1);
// Test(test4, 16);
// Test(test5, 2500);
// Test(test6, 506250);



let result = 0;
for (const iter of allSprings.slice(0)) {
	for (const iter2 of iter) {
		result += iter2
	}
};

console.log({
	Result: result,
	// text: test1.springText
})

