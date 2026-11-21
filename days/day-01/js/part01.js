/** @param {string} input */
export function part1(input) {
	const data = input.split("");
	let up = 0, down = 0;
	for (let index = 0; index < data.length; index++) {
		if (data[index] === "(") up++;
		if (data[index] === ")") down++;
	}
	return up - down;
}
