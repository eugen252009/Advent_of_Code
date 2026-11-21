import { isMain, readInput, runParts } from "../../../bootstrap.js";
import part1 from "./part1.js";

export { part1 };
export const loadInput = () => undefined;

if (isMain(import.meta.url)) {
  await runParts({ part1 }, loadInput);
}
