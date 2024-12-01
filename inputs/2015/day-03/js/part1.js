export function part1(input) {
	const set = new Set();
	let x = 0,
		y = 0;
	for (let i = 0; i < input.length; i++) {
		if (input[i] === "<")
			set.add(`${x--}${y}`);
		if (input[i] === ">")
			set.add(`${x++}${y}`);
		if (input[i] === "^")
			set.add(`${x}${y++}`);
		if (input[i] === "v")
			set.add(`${x}${y--}`);
	}
	return set.size;
}
function walk(direction, { x, y }) {
	if (direction === "<")
		return `${x--}${y}`;
	if (direction === ">")
		return `${x++}${y}`;
	if (direction === "^")
		return `${x}${y++}`;
	if (direction === "v")
		return `${x}${y--}`;
}

class Santa {
	x = 0
	y = 0
	houses = new Set()
	constructor() {
		this.houses.add(`${this.x}:${this.y}`)
	}
	move(direction) {
		switch (direction) {
			case ">":
				this.x += 1
				this.houses.add(`${this.x}:${this.y}`)
				break
			case "<":
				this.x -= 1
				this.houses.add(`${this.x}:${this.y}`)
				break
			case "^":
				this.y -= 1
				this.houses.add(`${this.x}:${this.y}`)
				break
			case "v":
				this.y += 1
				this.houses.add(`${this.x}:${this.y}`)
				break
		}
	}
}
export function part2(input) {
	const santa = new Santa();
	const robosanta = new Santa();
	for (let i = 0; i < input.length; i++) {
		if (i % 2 === 0) {
			santa.move(input[i])
		} else {
			robosanta.move(input[i])
		}
	}
	robosanta.houses.forEach(x => santa.houses.add(x))
	return santa.houses.size;
}
