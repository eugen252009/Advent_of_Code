import { isMain, readInput, runParts } from "../../../bootstrap.js";
import { result, Test } from "./part1.js";
const part1 = (input) => { Test(); return result(input.slice(0, -1)); };

export { part1 };
export const loadInput = () => readInput(import.meta.url, { raw: true });

if (isMain(import.meta.url)) {
  await runParts({ part1 }, loadInput);
}
