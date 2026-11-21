import nodeTest from "node:test";
import assert from "node:assert";
import { part1 } from "./part01.js";

const testinput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

function test() {
	try {
		assert.equal(part1(testinput), 2, "Part 1");
		// assert.equal(part2(testinput), 31, "Part 2");
		// assert(part1(testinput) === 11, part1(testinput));
		// assert(31 === part2(testinput), part2(testinput));
	} catch (error) {
		console.log(
			`Testing error: ${error.message} got:${error.actual} needed:${error.expected} `,
		);
	}
}

nodeTest("existing examples", test);
