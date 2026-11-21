import test from "node:test";
import { test as solveTests } from "./day15.js";

if (typeof solveTests === "function") test("existing examples", solveTests);
