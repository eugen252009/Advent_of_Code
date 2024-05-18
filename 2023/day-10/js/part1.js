import { readFileSync } from "fs"
// let input = `..F7.
// .FJ|.
// SJ.L7
// |F--J
// LJ...`
const input = readFileSync("../input", "utf8")
const toBottom = [
	"|",
	"J",
	"L",

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
	"-",
	"F",
	"L"
]
class Queue {
	_queue = [];
	constructor(data) {
		if (data !== undefined)
			for (const iter of data) {
				this.enqueue(iter)
			}
	}
	enqueue(item) {
		this._queue.push(item)
	}
	get() {
		return this._queue.shift()
	}
	length() {
		return this._queue.length
	}
}
const mazemap = parse(input, input.indexOf("\n"));
// console.log(mazemap.map(x => x.middletile), input)
const ways = walkMaze(mazemap)
function walkMaze(maze) {
	const que = new Queue();
	const res = maze.reduce(
		(acc, element, id) => {
			if (element.mid.tile === "S") {
				acc = id
			};
			return acc
		}, -1)
	que.enqueue(res)
	const previouswalk = {}
	const way = []
	do {
		const id = que.get()
		const result = checkalldirs(maze[id])
		if (result.up) {
			const newid = maze[id].up.id
			if (previouswalk[newid] == undefined) {
				previouswalk[newid] = true
				que.enqueue(newid)
				way.push(newid)
			}
		}
		if (result.down) {
			const newid = maze[id].down.id
			if (previouswalk[newid] == undefined) {
				previouswalk[newid] = true
				que.enqueue(newid)
				way.push(newid)
			}
		}
		if (result.right) {
			const newid = maze[id].right.id
			if (previouswalk[newid] == undefined) {
				previouswalk[newid] = true
				que.enqueue(newid)
				way.push(newid)
			}
		}
		if (result.left) {
			const newid = maze[id].left.id
			if (previouswalk[newid] == undefined) {
				previouswalk[newid] = true
				que.enqueue(newid)
				way.push(newid)
			}
		}
	} while (que.length() !== 0);
	return way
}
function checkalldirs(tile) {
	switch (tile.mid.tile) {
		case "-": {
			return {
				right: tile.right == undefined ? undefined : checkright(tile),
				left: tile.up == undefined ? undefined : checkleft(tile),
			}
		}
		case "|": {
			return {
				up: tile.up == undefined ? undefined : checkup(tile),
				down: tile.down == undefined ? undefined : checkdown(tile),
			}
		}
		case "7":
			return {
				down: tile.down == undefined ? undefined : checkdown(tile),
				left: tile.left == undefined ? undefined : checkleft(tile),
			}
		case "L":
			return {
				up: tile.up == undefined ? undefined : checkup(tile),
				right: tile.right == undefined ? undefined : checkright(tile),
			}
		case "F":
			return {
				down: tile.down == undefined ? undefined : checkdown(tile),
				right: tile.right == undefined ? undefined : checkright(tile),
			}
		case "J":
			return {
				up: tile.up == undefined ? undefined : checkup(tile),
				left: tile.left == undefined ? undefined : checkleft(tile),
			}



		default:
			return {
				up: tile.up == undefined ? undefined : checkup(tile),
				right: tile.right == undefined ? undefined : checkright(tile),
				left: tile.up == undefined ? undefined : checkup(tile),
				down: tile.up == undefined ? undefined : checkup(tile),
			}
	}
}
function checkright(tile) {
	return toRight.includes(tile.right.tile) ? true : false;
}
function checkleft(tile) {
	return toLeft.includes(tile.left.tile) ? true : false;
}
function checkup(tile) {
	return toTop.includes(tile.up.tile) ? true : false;
}
function checkdown(tile) {
	return toBottom.includes(tile.down.tile) ? true : false;
}


function parse(maze, cols) {
	const [vertical, horizontal] = [cols, 1];
	const mazemap = [];
	maze.split("").filter(x => x !== "\n")
		.forEach((element, index, arr) => {
			const middle = element
			const up = arr[index - vertical] != undefined ? { id: index - vertical, tile: arr[index - vertical] } : undefined
			const down = arr[index + vertical] != undefined ? { id: index + vertical, tile: arr[index + vertical] } : undefined
			const right = arr[index + horizontal] != undefined ? { id: index + horizontal, tile: arr[index + horizontal] } : undefined
			const left = arr[index - horizontal] != undefined ? { id: index - horizontal, tile: arr[index - horizontal] } : undefined
			mazemap.push(
				{
					mid: { id: index, tile: middle },
					up,
					down,
					left,
					right,
				})
		});
	return mazemap
}
console.log((ways.length + 1) / 2)
