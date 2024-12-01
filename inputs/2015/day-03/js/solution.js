import { readFileSync } from "fs"
import { part1, part2 } from "./part1"

const input = readFileSync("../input", "utf8").trimEnd();
console.time("total runtime")
console.log(`The solution of Part 1 is: ${part1(input)}`);
console.log(`The solution of Part 2 is: ${part2(input)}`);
console.timeEnd("total runtime")
