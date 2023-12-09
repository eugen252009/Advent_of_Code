Array.prototype.last = function() {
	return this[this.length - 1]
}
Array.prototype.first = function() {
	return this[0]
}

import { readFileSync } from "fs"
const input = readFileSync("../input", "utf8")
	.split("\n")
	.filter(line => line.length)
	.map(i => i.split(" ").flatMap(i => parseInt(i)))
solve(input)
function solve(input) {
	const res = [];
	for (const data of input) {
		res.push(calc(data))
	}
	const result = res.reduce((acc, val) => acc + val, 0)
	console.log("result:\t", result  )
}
function calc(slice) {
	const res = [slice]
	for (let i = 0; i < res.length; i++) {
		const data = []
		for (let j = 0; j < res[i].length - 1; j++) {
			const element = res[i][j]
			const element2 = res[i][j + 1]
			// if (element2 == undefined) break
			data.push(element2 - element)
		}
		res.push(data)
		if (data.reduce((acc, val) => acc - val) ===0 ) { break }
	}
	for (let i = res.length - 1; i > 0; i--) {
		if (i - 1 >= 0)
			res[i - 1].push(res[i].last() + res[i - 1].last())
	}
	return res.first().last()
}
