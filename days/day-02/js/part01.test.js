import test from "node:test";
import assert from "assert"
import { part1 } from "./part01.js";

test("part 1: existing examples", () => {
	//Part 1
	assert(part1("2x3x4") === 58)
	assert(part1("1x1x10") === 43)
});
