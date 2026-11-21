import assert from "node:assert/strict";
import test from "node:test";
import { part1 } from "./day01.js";

test("part 1: final floor", () => {
  for (const [input, floor] of [["()", 0], ["((", 2], ["))", -2], [")()", -1]]) {
    assert.equal(part1(input), floor);
  }
});
