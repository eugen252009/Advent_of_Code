import { readFileSync } from "node:fs"
import { result as part1, Test as test1 } from "./part1"
// import { result as part2, Test as test2 } from "./part2"
const input = readFileSync("../input", "utf8").slice(0, -1)
test1()
// test2()
console.log(part1(input))
// console.log(part2())
