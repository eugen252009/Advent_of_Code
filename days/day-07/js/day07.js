import { isMain, runParts } from "../../../bootstrap.js";

export function part1() {
  return import("./part01.js");
}
export const loadInput = () => undefined;

if (isMain(import.meta.url)) {
  await runParts({ part1 }, loadInput);
}
