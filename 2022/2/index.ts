import fs from "fs"
const input = fs.readFileSync("input.txt").toString()
const sample = `A Y
B X
C Z`

const ROCK = 1
const PAPER = 2
const SCISSORS = 3
const WIN = 6
const DRAW = 3
const LOOSE = 0
const type = {
	Z: "WIN",
	Y: "DRAW",
	X: "LOOSE",
	A: "ROCK",
	B: "PAPER",
	C: "SCISSORS",
}
// Day1
const lookuptable = {
	ROCK: {
		ROCK: DRAW + ROCK,
		PAPER: WIN + PAPER,
		SCISSORS: LOOSE + SCISSORS,
	},
	PAPER: {
		ROCK: LOOSE + ROCK,
		PAPER: DRAW + PAPER,
		SCISSORS: WIN + SCISSORS,
	},
	SCISSORS: {
		ROCK: WIN + ROCK,
		PAPER: LOOSE + PAPER,
		SCISSORS: DRAW + SCISSORS,
	},
}
// DAY 2
const lookuptable2 = {
	ROCK: {
		DRAW: ROCK + DRAW,
		WIN: PAPER + WIN,
		LOOSE: SCISSORS + LOOSE,
	},
	PAPER: {
		LOOSE: ROCK + LOOSE,
		DRAW: PAPER + DRAW,
		WIN: SCISSORS + WIN,
	},
	SCISSORS: {
		WIN: ROCK + WIN,
		LOOSE: PAPER + LOOSE,
		DRAW: SCISSORS + DRAW,
	},
}

const preprocess = input
	.split("\n")
	.map((item) => item.replace(" ", ""))
	.map((item) => checkwin(item))

function checkwin(data: string) {
	// @ts-ignore
	return lookuptable2[type[data.slice(0, 1)]][type[data.slice(1)]]
}

console.log(preprocess.reduce((acc, num) => acc + num))
