import nodeTest from "node:test";

function test() {
	try {
		// assert.equal(part1(testinput), 2, "Part 1");
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
