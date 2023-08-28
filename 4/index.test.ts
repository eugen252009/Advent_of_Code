import { describe, expect, it } from "@jest/globals"
import { checkoverlap, sample } from "."

describe("index.ts", () => {
	it("check for overlap", async () => {
		expect(checkoverlap([2, 4], [6, 8])).toBe(false)
	})
})
