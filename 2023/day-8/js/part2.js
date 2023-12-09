Array.prototype.sliceArr = function(to) {
	const res = []
	while (this.length > 0) {
		res.push(this.splice(0, to ?? 2))
	}
	return res
}
Array.prototype.getLast = function() {
	return this[this.length - 1]
}
Array.prototype.parse = function() {
	const res = {}
	res[this[0]] = [this[1], this[2]]
	return res
}

import { readFileSync } from "fs"
const input = readFileSync("../input", "utf8")
	.slice(0, -1)
	.split("\n")
	.filter(line => line.length).flat(i => i.trim().split("=")).flatMap(i => i.split("="))
	.flatMap(i => i.replace("(", "").replace(")", "").split(","))
	.flatMap(i => i.trim());
solve(input)

function solve(input) {
	const [rawinstructions, ...rawpaths] = input
	const paths = rawpaths.sliceArr(3).map(i => i.parse()).reduce((previous, current) => {
		return { ...previous, ...current }
	}, {})
	const instructions = rawinstructions.split("")
	const items = Object.entries(paths).filter(i => i[0].slice(-1) === "A")
	const res = []
	for (const item of items) {
		const element = item[0]
		res.push(walk(element, { instructions, paths }))
	}
	const max = res.reduce((acc, curr) => {
		return Math.max(acc, curr[0])
	}, 0)

	console.log({ res, max })
}
function walk(item, { paths, instructions }) {
	let i = 0, lastitem = item
	do {
		if (instructions[i % instructions.length] === "R") {
			lastitem = paths[lastitem][1]
		} else if (instructions[i % instructions.length] === "L") {
			lastitem = paths[lastitem][0]
		}
		i++
	}
	while (lastitem.slice(-1) !== "Z")
	return [i, lastitem]
}

