import { readFileSync } from "fs"
const input = readFileSync("../testinput", "utf8")
const nearbycells = [-1, 1, 0, 0]
const nearbyrows = [0, 0, -1, 1]

const parsedinput = parse(input)
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
	return [adjacency_list, galaxys]
}

function solve([grid, galaxys]) {
	return bfs(galaxys, grid)
}

function bfs(e, f) {
	const queue = []
	const visited = []
	queue.push(e)
	visited.push(e)

	// console.log(e, f)
	return 1
}
