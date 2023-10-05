import { describe, expect, it } from "@jest/globals"
import { checkoverlaphalf2, checkoverlaphalf1 } from "."

describe("index.ts", () => {
	it("check for overlap half1", async () => {
		expect(checkoverlaphalf1([2, 3], [4, 5])).toBe(false)
		expect(checkoverlaphalf1([5, 7], [7, 9])).toBe(false)
		expect(checkoverlaphalf1([2, 8], [3, 7])).toBe(true)
		expect(checkoverlaphalf1([6, 6], [4, 6])).toBe(true)
		expect(checkoverlaphalf1([2, 6], [4, 8])).toBe(false)
	})
	it("check for overlap half2", async () => {
		expect(checkoverlaphalf2([2, 3], [4, 5])).toBe(false)
		expect(checkoverlaphalf2([5, 7], [7, 9])).toBe(true)
		expect(checkoverlaphalf2([2, 8], [3, 7])).toBe(true)
		expect(checkoverlaphalf2([6, 6], [4, 6])).toBe(true)
		expect(checkoverlaphalf2([2, 6], [4, 8])).toBe(true)
	})
})
