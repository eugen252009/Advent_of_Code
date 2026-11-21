import { isMain, readInput, runParts } from "../../../bootstrap.js";
import solution from "./solution.js";
const { part1, part2 } = solution;
export const test = solution.Tests ?? solution.test;

export { part1, part2 };
export const loadInput = () => readInput(import.meta.url);

if (isMain(import.meta.url)) {
  await runParts({ part1, part2 }, loadInput);
}
