import nodeTest from "node:test";
import assert from "assert";
import { part1 } from "./part01.js";

function Tests() {
	assert(part1("") === -1)
}

nodeTest("existing examples", Tests);
