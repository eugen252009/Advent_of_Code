import nodeTest from "node:test";
import assert from "node:assert";
import { part1 } from "./part01.js";
import { part2 } from "./part02.js";

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

nodeTest("existing examples", test);
