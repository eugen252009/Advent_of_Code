import { isMain, readInput, runParts } from "../../../bootstrap.js";
import { part1 } from "./part01.js";
import { part2 } from "./part02.js";

export { part1, part2 };
export const loadInput = () => undefined;

if (isMain(import.meta.url)) {
  await runParts({ part1, part2 }, loadInput);
}
