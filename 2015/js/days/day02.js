import assert from "assert"

export function Tests() {
	//Part 1
	assert(part1("2x3x4") === 58)
	assert(part1("1x1x10") === 43)
	//Part 2 
	assert(part2("2x3x4") === 34)
	assert(part2("1x1x10") === 14)
}

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
export default {
	part1, part2, Tests, name: 2
}
