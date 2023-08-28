import fs from "fs"
const input = fs.readFileSync("input.txt").toString()

// number of elfes (Result)
let half1 = 0
let half2 = 0
export const sample = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

// Preprocess Data for besser usage
const data: string[] = input.split("\n")
const tmp = data.map((item) => item.split(","))
const tmp2 = tmp.map((item) =>
	item
		.map((items) => items.split("-").map((itemss) => parseInt(itemss)))
		.flat(),
)

// Process Data and store it in half1 or half 2

tmp2.map((item, index) => {
	if (checkoverlaphalf1([item[0], item[1]], [item[2], item[3]])) {
		half1 += 1
	}
	if (checkoverlaphalf2([item[0], item[1]], [item[2], item[3]])) {
		half2 += 1
	}
})

export function checkoverlaphalf1(number1: number[], number2: number[]) {
	if (
		(number1[0] <= number2[0] && number1[1] >= number2[1]) ||
		(number2[0] <= number1[0] && number2[1] >= number1[1])
	) {
		return true
	} else {
		return false
	}
}

export function checkoverlaphalf2(number1: number[], number2: number[]) {
	if (
		(number1[0] <= number2[1] && number1[1] >= number2[0]) ||
		(number2[0] <= number1[1] && number2[1] >= number1[0])
	) {
		return true
	} else {
		return false
	}
}
