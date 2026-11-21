const testinput = "O....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#...."

const testresult = `OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`

export function Test() {
	result(testinput)
	console.assert(tiltup(testinput)[0] === testresult, `Maze not formatted right`)
	console.assert(result(testinput) === 136, `Wrong Result`)
	console.log("All Tests Passed")
}

/** @param {string} input */
export function part1(input) {
	Test();
	return result(input.slice(0, -1));
}

export function result(x) {
	const [newMaze, size] = tiltup(x)
	const res = CountRocks(newMaze, size)
	return res
}
function CountRocks(maze, size, counter = 0) {
	for (let index = 0; index < maze.length; index++) {
		if (maze[index] === "O") {
			counter += size
		}
		if (maze[index] === "\n") {
			size -= 1
		}
	}
	return counter
}

function tiltup(x) {
	let data = x.split("");
	let size = 1
	let getwidth = Infinity;

	for (let i = 0; i < data.length; i++) {
		if (data[i] === "\n") {
			if (getwidth === Infinity) {
				getwidth = i + 1;
			}
			size++
			continue;
		}

		if (data[i] === "O" && data[i - getwidth] === ".") {
			data[i - getwidth] = "O";
			data[i] = ".";
			size -= 1
			i -= getwidth + 1;
		}
	}
	return [data.join(""), size];
}
