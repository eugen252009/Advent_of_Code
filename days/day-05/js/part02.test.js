import test from "node:test";
import { equal } from "assert/strict"
import { part2 } from "./part02.js";

test("part 2: existing examples", () => {
	equal(part2("qjhvhtzxzqqjkmpb"), 1);
	equal(part2("xxyxx"), 1);

	equal(part2("uurcxstgmygtbstg"), 0);
	// assert(part2("ieodomkazucvgmuy") === 0);
});
