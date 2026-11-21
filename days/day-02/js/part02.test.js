import test from "node:test";
import assert from "assert"
import { part2 } from "./part02.js";

test("part 2: existing examples", () => {
	assert(part2("2x3x4") === 34)
	assert(part2("1x1x10") === 14)
});
