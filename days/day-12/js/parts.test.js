import test from "node:test";
import { test as solveTests } from "./day12.js";

if (typeof solveTests === "function") test("existing examples", solveTests);
