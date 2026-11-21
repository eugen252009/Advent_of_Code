/** @param {string} input */
export function part2(input) {
	const data = input.split("");
	let up = 0, down = 0;
	for (let index = 0; index < data.length; index++) {
		if (data[index] === "(") up++;
		if (data[index] === ")") down++;
		if (up - down === -1) return index + 1;
	}
	return -1
}
