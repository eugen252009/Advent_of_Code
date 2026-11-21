import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DAY, readInput } from "../bootstrap.js";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const testing = args[0] === "--test";
if (testing) args.shift();
const selection = args[0] ?? (testing ? "all" : String(DAY));
if (args.length > 1 || (selection !== "all" && !/^(0?[1-9]|1[0-9]|2[0-5])$/.test(selection))) {
  console.error("Usage: node scripts/run-js.mjs [--test] [DAY|all]");
  process.exit(1);
}
const days = selection === "all" ? Array.from({ length: 25 }, (_, i) => i + 1) : [Number(selection)];
let failed = false;
let tested = 0;
for (const day of days) {
  const number = String(day).padStart(2, "0");
  const folder = join(root, "days", `day-${number}`);
  const js = join(folder, "js");
  const entry = join(js, `day${number}.js`);
  const legacy = join(js, "solution.js");
  const solution = existsSync(entry) ? entry : existsSync(legacy) ? legacy : null;
  const input = join(folder, "input");
  if (!testing && !solution) {
    if (selection !== "all") {
      console.error("Lösung fehlt: " + entry);
      failed = true;
    }
    continue;
  }
  try {
    if (testing && existsSync(js)) {
      const files = readdirSync(js, { withFileTypes: true })
        .filter(file => file.isFile() && /test\.(?:m?js)$/.test(file.name))
        .map(file => file.name)
        .sort();
      if (files.length) {
        tested++;
        console.log(`Tag ${day}: ${files.join(", ")}`);
        const result = spawnSync(process.execPath, ["--test", ...files.map(file => `./${file}`)], {
          cwd: js,
          stdio: "inherit",
        });
        if (result.error) throw result.error;
        if (result.status !== 0) failed = true;
        continue;
      }
    }
    if (!solution) {
      if (selection !== "all") {
        console.error(`Tag ${day}: keine JavaScript-Tests gefunden`);
        failed = true;
      }
      continue;
    }
    const solutionURL = pathToFileURL(solution);
    const module = await import(solutionURL.href);
    const parts = module.default ?? module;
    if (testing) {
      const test = module.Tests ?? module.test ?? parts.Tests ?? parts.test;
      if (typeof test === "function") {
        tested++;
        await test();
        console.log("Tag " + day + ": Tests bestanden");
      } else if (selection !== "all") {
        console.error("Tag " + day + ": keine Tests exportiert");
        failed = true;
      }
      continue;
    }
    if (!module.loadInput && !existsSync(input)) {
      if (selection === "all") continue;
      throw new Error("Input fehlt: " + input + " (make fetch " + day + ")");
    }
    let data;
    try {
      data = await (module.loadInput ? module.loadInput() : readInput(solutionURL));
    } catch (error) {
      if (error.code === "ENOENT" && selection === "all") continue;
      throw error;
    }
    for (const name of ["part1", "part2"]) {
      if (typeof parts[name] !== "function") continue;
      const answer = await parts[name](data);
      if (answer !== undefined) console.log(`Tag ${day} ${name}:`, answer);
    }
  } catch (error) {
    console.error("Tag " + day + ": " + error.message);
    failed = true;
  }
}
if (testing && !tested && !failed) console.log("Keine JavaScript-Tests gefunden.");
if (failed) process.exitCode = 1;
