import test from "node:test";
import { test as solveTests } from "./day10.js";

if (typeof solveTests === "function") test("existing examples", solveTests);
