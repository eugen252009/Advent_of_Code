import test from "node:test";
import { test as solveTests } from "./day14.js";

if (typeof solveTests === "function") test("existing examples", solveTests);
