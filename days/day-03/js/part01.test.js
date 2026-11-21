import nodeTest from "node:test";
import assert from "assert";
import { part1 } from "./part01.js";

function Tests() {
	assert(part1(">") === 1)
	assert(part1("^>v<") === 4)
	assert(part1("^v^v^v^v^v") === 2)
}

nodeTest("existing examples", Tests);
