import test from "node:test";
import { equal } from "assert/strict"
import { part1 } from "./part01.js";

test("part 1: existing examples", () => {
	equal(part1("aaa"), 1);
	equal(part1("ugknbfddgicrmopn"), 1);

	equal(part1("jchzalrnumimnmhp"), 0);
	equal(part1("haegwjzuvuyypxyu"), 0);
	equal(part1("haegwjzuvuyypxyu"), 0);
});
