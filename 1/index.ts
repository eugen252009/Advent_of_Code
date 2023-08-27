import fs from "fs"

const input = fs.readFileSync("input.txt").toString()
const sample = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`
function calculateTotal(arr: string[]) {
	return arr.map((int) => parseInt(int))
}

const data = input.split("\n\n")
const inventory = data.map((item) => {
	return item.split("\n")
})

const result = inventory.map((calories) => calculateTotal(calories))
let x = result.map((items) => items.reduce((acc, num) => acc + num), 0)

function findlargest(number: number[]) {
	let result = 0
	number.forEach((element) => {
		result = Math.max(element, result)
	})
	return result
}
const result1: number[] = []
result1.push(findlargest(x))
x = x.filter((item) => result1[0] !== item)
result1.push(findlargest(x))
x = x.filter((item) => result1[1] !== item)
result1.push(findlargest(x))
console.log(result1.reduce((acc, num) => acc + num))
