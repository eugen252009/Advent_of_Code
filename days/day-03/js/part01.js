/** @param {string} input */
export function part1(input) {
	const set = new Set();
	let x = 0,
		y = 0;
	for (let i = 0; i < input.length; i++) {
		if (input[i] === "<")
			set.add(`${x--}:${y}`);
		if (input[i] === ">")
			set.add(`${x++}:${y}`);
		if (input[i] === "^")
			set.add(`${x}:${y++}`);
		if (input[i] === "v")
			set.add(`${x}:${y--}`);
	}
	return set.size;
}
