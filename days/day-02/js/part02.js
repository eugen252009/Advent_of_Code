/** @param {string} input */
export function part2(input) {
	let result = 0;
	const data = input.split("\n");
	for (let index = 0; index < data.length; index++) {
		const element = data[index].split("x").map(Number);
		const [x, y, z] = element;
		if (x >= y && x >= z) {
			result += (y + y) + (z + z) + (x * y * z)
			continue
		}
		if (z >= y && z >= x) {
			result += (y + y) + (x + x) + (x * y * z)
			continue
		}
		if (y >= x && y >= z) {
			result += (x + x) + (z + z) + (x * y * z)
			continue
		}
	}
	return result
}
