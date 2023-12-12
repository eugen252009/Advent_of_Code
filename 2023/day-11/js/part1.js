import { readFileSync } from "fs"
const input = readFileSync("../testinput", "utf8")
const nearbycells = [-1, 1, 0, 0]
const nearbyrows = [0, 0, -1, 1]

const parsedinput = parse(input)
// console.log({ parsedinput })
const result = solve(parsedinput)
console.log({ result })

function parse(inputstring) {
	const data = inputstring.split("\n").filter(line => line.length).flatMap(line => line.split(""))
	const len = data.length
	const adjacency_list = new Map()
	const galaxys = []
	for (let index = 0; index < data.length; index++) {
		if (data[index] === "#") {
			galaxys.push(index)
		}
		const addMap = []
		for (let cell = 0; cell < 4; cell++) {
			const rr = nearbycells[cell] + index
			const cc = nearbyrows[cell] + index
			if (rr < 0 || rr >= len) continue
			if (cc < 0 || cc >= len) continue
			addMap.push([rr, cc])
		}
		adjacency_list.set(index, addMap)
	}
	// adjacency_list.get(1)
	return [adjacency_list, galaxys]
}
function solve([grid, galaxys]) {
	console.log(galaxys)
	while (true) {
		// console.log(grid.get(start[0]))
		break
	}
}
