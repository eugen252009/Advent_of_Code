import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Change this number to select the day for `make js`.
export const DAY = 1;

// From days/day-XX/js/solution.js, call readInput(import.meta.url).
export function readInput(solutionURL, { raw = false } = {}) {
  const data = readFileSync(new URL("../input", solutionURL), "utf8");
  return raw ? data : data.trimEnd();
}

export function isMain(moduleURL) {
  return Boolean(process.argv[1] && resolve(process.argv[1]) === fileURLToPath(moduleURL));
}

export async function runParts(parts, loadInput) {
  const input = await loadInput();
  for (const number of [1, 2]) {
    const part = parts[`part${number}`];
    if (typeof part !== "function") continue;
    const answer = await part(input);
    if (answer !== undefined) console.log(`Part ${number}:`, answer);
  }
}
