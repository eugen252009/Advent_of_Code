import { readFileSync } from "fs"
Array.prototype.flip = function() {
	const reversedRows = this.map(str => str.split('').reverse().join(''));
	const transposedArray = reversedRows[0].split('').map((_, i) => reversedRows.map(row => row[i])).map(row => row.join(''));
	return transposedArray;
}

const input = readFileSync("../testinputp1", "utf8").slice(0, -1)
// const input = readFileSync("../input", "utf8").slice(0, -1)
function findreflection(input) {
	let result = 0
	// for (let i = 0; i < input.length; i++) {
	// 	const a = input[i]
	// 	const b = input[i + 1]
	// 	if (a === b) {
	// 		const test2 = input.slice(i + 1)
	// 		const test1 = input.slice(0, i + 1).reverse();
	// 		const len = Math.min(test2.length, test1.length)
	// 		test2.length = len
	// 		test1.length = len
	// 		if (test2.length !== test1.length)
	// 			continue
	// 		const equal = test1.every((val, id) => val === test2[id])
	// 		if (equal) {
	// 			result += (i + 1) * 100
	// 			break
	// 		}
	// 		continue
	// 	}
	// }

	const flipped = input.slice(0).flip()
	for (let i = 0; i < flipped.length; i++) {
		const a = flipped[i]
		const b = flipped[i + 1]
		if (a === b) {
			// console.log({ a, b })
			const test1 = flipped.slice(i)
			const test2 = flipped.slice(i + 1)
			console.log({ test1, test2 }, "\n" + flipped.join("\n"))
			if (test1.every((val, id) => val === test2[id])) {
				// console.log({ test1, test2, l: test1.length })
				result += test1.length - 2
				break
			}
		}
	}
	return result
}

function parsedInput(input) {
	return input.split("\n\n").map(item => item.split("\n"))
}

const parsedinput = parsedInput(input)
let result = 0
for (const data of parsedinput) {
	const tmp = findreflection(data)
	result += tmp
}

console.log({ result })
