import { readFileSync } from "fs"
const input = readFileSync("../input", "utf8").slice(0, -1);
const [time, distance] = input.split("\n").map(line => line.split(":")[1].trim()).map(item => item.replaceAll(" ", ""))


console.log(solve(time, distance))
function solve(times, distances) {
	const margin = []
	const alldist = calcTime(time)
	margin.push(alldist.filter(dist => dist > distances).length)
	console.log(margin.reduce((acc, val) => acc * val, 1))
}
function calcTime(time) {
	let distances = []
	for (let index = 0; index < time; index++) {
		let [speed, wait] = [index, index]
		const distance = speed * (time - wait)
		distances.push(distance)
	}
	return distances
}
