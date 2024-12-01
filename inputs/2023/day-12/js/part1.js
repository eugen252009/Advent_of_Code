import fs from "node:fs"

export class Springs {
	springText = "";
	numbers = [];
	result = 0;
	constructor(input, numbers) {
		this.springText = input;
		this.numbers = numbers;
	}
	[Symbol.iterator] = function* dephFirst() {
		if (this.springText.indexOf("?") !== -1) {
			yield* new Springs(this.springText.replace("?", "."))
			yield* new Springs(this.springText.replace("?", "#"))
		} else {
			yield this.springText;
		}
	}

	getAllPossibilites() {
		const possibility = ([...this]
			.map(x => x
				.split(".")
				.filter(y => y)
				.map(y => y.length)
			))
			.reduce((acc, z) => compareArr(z, this.numbers) ? acc += 1 : acc, 0);
		return possibility;
	}
}

function compareArr(a, b) {
	if (a.length !== b.length) return false;
	return a.every((x, id) => x === b[id]);
}
const data = fs
	.readFileSync("../testinput.txt", "utf8")
	.split("\n")
	.filter(x => x)
	.map(x => new Springs(x.split(" ").at(0), x.split(" ").at(1).split(",").map(x => +x)));

// Part 1
console.log("Part 1:", data.reduce((acc, x) => acc += x.getAllPossibilites(), 0))
