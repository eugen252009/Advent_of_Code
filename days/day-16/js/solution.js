const testinput = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`

const lookup = {
	r: 1,
	l: -1,
	u: 0,
	d: 0,
}
const width = testinput.split("\n").at(0).length + 1
lookup["u"] = -width;
lookup["d"] = width;
function depthFirst(input, dir = "r", n = 0, visited = {}) {
	if (n + dir in visited) return 0
	if (input[n + lookup[dir]] === undefined || input[n + lookup[dir]] === "\n") return 0
	console.log(dir, n, n + lookup[dir], input[n], input[n + lookup[dir]])
	visited[n + dir] = 1
	let result = 1;
	if (input[n + lookup[dir]] === ".") {
		return result + depthFirst(input, dir, n + lookup[dir], visited)
	}
	switch (dir) {
		case "l": {
			if (input[n + lookup[dir]] === "/") {
				result += depthFirst(input, "d", n + lookup[dir], visited)
				break
			}
		}
		case "r": {
			if (input[n + lookup[dir]] === "-") {
				result += depthFirst(input, dir, n + lookup[dir], visited)
				break
			}
			if (input[n + lookup[dir]] === "/") {
				result += depthFirst(input, "u", n + lookup[dir], visited)
				break
			}
			if (input[n + lookup[dir]] === "\\") {
				result += depthFirst(input, "d", n + lookup[dir], visited)
				break
			}
			if (input[n + lookup[dir]] === "|") {
				const up = depthFirst(input, "u", n + lookup[dir], visited);
				const down = depthFirst(input, "d", n + lookup[dir], visited);
				// console.log({ up, down })
				result += up + down
				break
			}
			break
		}
		case "u": {
			if (input[n + lookup[dir]] === "/") {
				result += depthFirst(input, "r", n + lookup[dir], visited)
				break
			}
			if (input[n + lookup[dir]] === "\\") {
				result += depthFirst(input, "l", n + lookup[dir], visited)
				break
			}
		}
		case "d": {
			if (input[n + lookup[dir]] === "|") {
				result += depthFirst(input, "d", n + lookup[dir], visited)
				break
			}
			if (input[n + lookup[dir]] === "/") {
				result += depthFirst(input, "l", n + lookup[dir], visited)
				break
			}
			if (input[n + lookup[dir]] === "\\") {
				result += depthFirst(input, "r", n + lookup[dir], visited)
				break
			}
			if (input[n + lookup[dir]] === "-") {
				const left = depthFirst(input, "l", n + lookup[dir], visited)
				const right = depthFirst(input, "r", n + lookup[dir], visited)
				// console.log({ left, right })
				result += right + left
				break;
			}
		}
	}
	return result;
}

console.log(testinput)
console.log()
const Result = depthFirst(testinput,);

console.log({ Result });
