import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const selection = process.argv[2] ?? "all";
if (process.argv.length > 3 || (selection !== "all" && !/^(0?[1-9]|1[0-9]|2[0-5])$/.test(selection))) {
  console.error("Usage: node scripts/run-js.mjs [DAY|all]");
  process.exit(1);
}
const days = selection === "all" ? Array.from({ length: 25 }, (_, i) => i + 1) : [Number(selection)];
let failed = false;
for (const day of days) {
  const folder = join(root, "days", "day-" + String(day).padStart(2, "0"));
  const solution = join(folder, "js", "solution.js");
  const input = join(folder, "input");
  if (!existsSync(solution) || !existsSync(input)) {
    console.log("Tag " + day + ": Lösung oder Input fehlt, übersprungen");
    if (selection !== "all") failed = true;
    continue;
  }
  try {
    const module = await import(pathToFileURL(solution).href);
    const parts = module.default ?? module;
    const data = readFileSync(input, "utf8").trimEnd();
    for (const name of ["part1", "part2"]) {
      if (typeof parts[name] === "function") console.log("Tag " + day + " " + name + ": " + await parts[name](data));
    }
  } catch (error) {
    console.error("Tag " + day + ": " + error.message);
    failed = true;
  }
}
if (failed) process.exitCode = 1;
