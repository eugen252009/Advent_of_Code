Array.prototype.sliceArr = function(to) {
	const res = []
	while (this.length > 0) {
		res.push(this.splice(0, to ?? 2))
	}
	return res
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
	const res = ["AAA"]
	let i = -1
	while (res.indexOf("ZZZ") == -1) {
		i++
		const lastpath = res[res.length - 1]
		if (instructions[i % instructions.length] === "R") {
			res.push(paths[lastpath][1])
		} else if (instructions[i % instructions.length] === "L") {
			res.push(paths[lastpath][0])
		}
	}
	console.log(res.length - 1)
}
