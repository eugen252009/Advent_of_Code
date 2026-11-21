import nodeTest from "node:test";
import assert from "assert";
import { part1 } from "./part01.js";

function Tests() {
	//Part1
	assert(part1("abcdef") === 609043)
	assert(part1("pqrstuv") === 1048970)
	return false
}

nodeTest("existing examples", Tests);
