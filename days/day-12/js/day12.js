import { isMain, readInput, runParts } from "../../../bootstrap.js";
import part1 from "./part1.js";
import part2 from "./part2.js";

export { part1, part2 };
export const loadInput = () => undefined;

if (isMain(import.meta.url)) {
  await runParts({ part1, part2 }, loadInput);
}
