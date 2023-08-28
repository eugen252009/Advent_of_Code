// @ts-ignore
import fs from "node:fs"
// const input = fs.readFileSync("input.txt").toString()

export const sample = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

// every elf has assigned sections
//
//
const data: string[] = sample.split("\n")
const tmp = data.map((item) => item.split(","))
const tmp2 = tmp.map((item) =>
	item
		.map((items) => items.split("-").map((itemss) => parseInt(itemss)))
		.flat(),
)
// console.log(tmp2)
let id = 0
tmp2.map((item, index) => {
	if (checkoverlap([item[0], item[1]], [item[2], item[3]])) {
		id += 1
	}
})
export function checkoverlap(number1: number[], number2: number[]) {
	if (
		(number1[0] <= number2[1] && number1[1] >= number2[0]) ||
		(number2[0] <= number1[1] && number2[1] >= number1[0])
	) {
		return true
	} else {
		return false
	}
}
console.log(id)
