import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readInput } from "../../../bootstrap.js";
import { part1 } from "./part01.js";
import { part2 } from "./part02.js";

export { part1, part2 };
export const loadInput = () => readInput(import.meta.url);

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const input = loadInput();
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));
}
