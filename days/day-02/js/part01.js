/** @param {string} input */
export function part1(input) {
	let result = 0;
	const data = input.split("\n");
	for (let index = 0; index < data.length; index++) {
		const element = data[index].split("x").map(Number);
		const [x, y, z] = element;
		result += 2 * x * y + 2 * y * z + 2 * x * z + Math.min(x * z, y * z, x * y)
	}
	return result
}
