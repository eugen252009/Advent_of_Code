import assert from "node:assert";
import { readFileSync } from "node:fs";

const input = readFileSync("../input", "utf8").split("\n\n")
class Mirrors {
	mirror = ""
	constructor(input) {
		this.mirror = input
	}
	horizontal() {
		const text = this.mirror.split("\n")
		for (let i = 0; i < text.length - 1; i++) {
			if (text[i + 1] === text[i]) {
				return i + 1;
			}
		}
		return -1;
	}
	vertical(input = this.mirror) {
		const textwidth = input.indexOf("\n") + 1;
		const textheight = (input.length + 1) / (textwidth)
		let n = 0
		for (let i = 0; i < textwidth; i++) {
			if (n === textheight) { throw new Error("Something doesnt add up") }
			const num = i + (n * textwidth)
			if (input[num] === input[num + 1]) {
				if (n === textheight - 1) {
					return i + 1
				}
				n += 1;
				i--
			} else {
				n = 0;
			}

		}
		return -1
	}
	calc() {
		let total = 0;
		let vertical = this.vertical();
		let horizontal = this.horizontal();
		// if (vertical === -1 || horizontal === -1) {
		// 	throw new Error(`Something went wrong\nHorizontal:${horizontal}\nVertical:${vertical}\n${this.mirror}`);
		// }
		if (vertical >= -1) total += vertical
		if (horizontal >= -1) total += horizontal * 100

		return total;
	}
}


const mirror = new Mirrors("#...##..#\n#....#..#\n..##..###\n#####.##.\n#####.##.\n..##..###\n#....#..#")

try {

	assert(mirror.horizontal() === 4, `Mirror: Wrong Horizontal Solution needed: 4 got: ${mirror.horizontal()}`)
	assert(mirror.vertical() === 3, `Mirror: Wrong Vertical Solution needed: 3 got: ${mirror.vertical()}`)

	// assert(test.horizontal() === 8, `Test: Wrong Horizontal Solution needed: 8 got: ${mirror.vertical()}`)
	// assert(test.vertical() === 6, `Test: Wrong Vertical Solution needed: 6 got: ${mirror.vertical()}`)

	assert(mirror.calc() === 403, `Wrong Vertical Solution needed: 403 got:${mirror.calc()}`)
} catch (error) {
	console.error(error)
}


const result = input.reduce((acc, galaxy) => {
	return acc + new Mirrors(galaxy).calc()
}, 0)
console.log(result)
