import { readFileSync } from "fs"
const input = readFileSync("../testinput", "utf8").split("\n").map(line => line.split("")).filter(item => item.length)

const pipes = [
	"|",
	"-",
	"J",
	"7",
	"L",
	"F",
]
const toBottom = [
	"|",
	"J",
	"L"
]
const toRight = [
	"-",
	"J",
	"7",
]
const toTop = [
	"|",
	"7",
	"F",
]
const toLeft = [
	"|",
	"J",
	"L"
]

const [result, data] = solve(input)
// console.log(result, "\n", data)
console.log(data)
function solve(input) {
	let [x, y] = findStart(input)
	input[x][y] = "0"
	let steps = 1
	while (true) {
		const [top, bottom, right, left] = findpipes({ input, x, y })
		if (toRight.includes(right[2]) !== -1) {
			x = right[0]
			y = right[1]
			console.log(x, y)
			input[x][y] = steps++
			continue
		}
		if (toLeft.includes(left[2]) !== -1) {
			x = left[0]
			y = left[1]
			console.log(x, y)
			input[x][y] = steps++
			continue
		}
		if (toTop.includes(top[2]) !== -1) {
			x = top[0]
			y = top[1]
			console.log(x, y)
			input[x][y] = steps++
			continue
		}
		if (toBottom.includes(bottom[2]) !== -1) {
			x = bottom[0]
			y = bottom[1]
			console.log(x, y)
			input[x][y] = steps++
			continue
		}
		break

		// if (bottom[2] !== -1 && toBottom.includes(pipes[bottom[2]])) {
		// 	// console.log(pipes[bottom[2]])
		// 	x = bottom[0]
		// 	y = bottom[1]
		// 	input[bottom[0]][bottom[1]] = steps++
		// 	continue
		// }
		// if (right[2] !== -1 && toRight.includes(pipes[right[2]])) {
		// 	// console.log(pipes[bottom[2]])
		// 	x = right[0]
		// 	y = right[1]
		// 	input[x][y] = steps++
		// 	continue
		// }
		// if (top[2] !== -1 && toTopludes(pipes[top[2]])) {
		// 	console.log(pipes[top[2]])
		// 	x = top[0]
		// 	y = top[1]
		// 	input[x][y] = steps++
		// 	continue
		// }
		// if (left[2] !== -1 && toRight.includes(pipes[right[2]])) {
		// 	// console.log(pipes[bottom[2]])
		// 	x = right[0]
		// 	y = right[1]
		// 	input[x][y] = steps++
		// 	continue
		// }
		// break
		//
	}
	console.log({ steps }, input)
	return [steps / 2, input]
}
function getpipeid({ input, x, y }) {
	return {
		left: pipes.indexOf(input[x][y - 1]),
		right: pipes.indexOf(input[x][y + 1]),
		top: pipes.indexOf(input[x - 1][y]),
		bottom: pipes.indexOf(input[x + 1][y]),
	}
}
function findStart(string) {
	let x, y;
	for (let i = 0; i < string.length; i++) {
		if (string[i].indexOf("S") !== -1) {
			x = i
			y = string[i].indexOf("S")
		}
	}
	return [x, y]
}
function findpipes({ input, x, y }) {
	return [
		[x - 1, y, pipes.indexOf(input[x - 1][y])],
		[x + 1, y, pipes.indexOf(input[x + 1][y])],
		[x, y + 1, pipes.indexOf(input[x][y + 1])],
		[x, y - 1, pipes.indexOf(input[x][y - 1])],
	]
}
