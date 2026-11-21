import assert from "node:assert/strict";
import test from "node:test";
import { part2 } from "./day01.js";

test("part 2: first basement position", () => {
  assert.equal(part2("()())"), 5);
  assert.equal(part2(")"), 1);
});
