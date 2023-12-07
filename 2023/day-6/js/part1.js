import { readFileSync } from "fs"
const input = readFileSync("../input", "utf8").slice(0, -1);


solve(input)
function solve(input) {
	const [times, distances] = input.split("\n").map(line => line.split(":")[1].trim()).map(item => item.split(" ").filter(it => it != ""))
	const margin = []
	for (const time of times) {
		const id = times.indexOf(time)
		const alldist = calcTime(time)
		margin.push(alldist.filter(dist => dist > distances[id]).length)
	}
	console.log(margin.reduce((acc, val) => acc * val, 1))
}
function calcTime(time) {
	let distances = []
	for (let index = 0; index < time; index++) {
		let [speed, wait] = [index, index]
		const distance = speed * (time - wait)
		distances.push(distance)
	}
	// console.log({distances})
	return distances
}
