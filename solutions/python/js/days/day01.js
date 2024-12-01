import assert from "assert";

function Tests() {
	//Part 1
	assert(part1("()") == 0);
	assert(part1("((") === 2);
	assert(part1("))") === -2);
	assert(part1(")()") === -1);

	//Part 2
	assert(part2("()())") == 5);
	assert(part2(")") == 1);
}

function part1(input) {
	const data = input.split("");
	let up = 0, down = 0;
	for (let index = 0; index < data.length; index++) {
		if (data[index] === "(") up++;
		if (data[index] === ")") down++;
	}
	return up - down;
}

function part2(input) {
	const data = input.split("");
	let up = 0, down = 0;
	for (let index = 0; index < data.length; index++) {
		if (data[index] === "(") up++;
		if (data[index] === ")") down++;
		if (up - down === -1) return index + 1;
	}
	return -1
}

export default {
	part1, part2, Tests, name: 1
}
