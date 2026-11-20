export const sample = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

export class Mutate {
	_tmp = undefined
	log = false;
	constructor(input) {
		this._tmp = input
	}
	apply(func) {
		this._tmp = func(this._tmp)
		if (this.log) console.log(this._tmp)
		return this
	}
	result() {
		return this._tmp;
	}
}

const sample1 = new Mutate(sample)

const splitCratesAndMoves = (input) => {
	const tmp = input.split("\n\n")
	const tmpcrates = tmp
		.at(0)
		.split("\n")
		.map(x => x);
	console.log(crates)
	for (let i = 0; i < tmpcrates.length - 1; i++) {
		crates[i].push(tmpcrates[i])
	}
	console.log(crates)
	const moves = tmp.at(1).split("\n").map(x => {
		const tmp = x.split(" ");
		return [tmp[1], tmp[3], tmp[5]];
	});
	return [tmpcrates.slice(0, -1), moves];
}

sample1
	.apply(splitCratesAndMoves)

// console.log(sample1.result())

