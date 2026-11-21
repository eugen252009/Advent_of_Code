import test from "node:test";
import { test as solveTests } from "./day17.js";

if (typeof solveTests === "function") test("existing examples", solveTests);
