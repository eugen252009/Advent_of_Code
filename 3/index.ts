// @ts-ignore
import fs from "node:fs"
const input = fs.readFileSync("input.txt").toString()
const sample = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`
let priority = 0
const data = input.split("\n")
const rucksacks = data.map((rucksack) => [
	rucksack.slice(0, rucksack.length / 2),
	rucksack.slice(rucksack.length / 2),
])

function calculatePriority(string: string) {
	console.log("found: " + string, string.charCodeAt(0))
	console.log("A", "A".charCodeAt(0) - 64)
	console.log("a", "a".charCodeAt(0) - 96)

	let prioritynum = 0
	if (string === string.toLowerCase()) {
		prioritynum = string.charCodeAt(0) - 96
		console.log("lowercase", prioritynum)
	}
	if (string === string.toUpperCase()) {
		prioritynum = string.charCodeAt(0) - 64 + 26
		console.log("uppercase", prioritynum)
	}

	priority += prioritynum
}

checkforDouble(rucksacks)
function checkforDouble(arr: string[][]) {
	return arr.map((item) => {
		let found = false
		const [firsthalf, secondhalf] = item
		let set = new Set(firsthalf.split(""))
		secondhalf.split("").forEach((char) => {
			if (!found && set.has(char)) {
				found = !found
				calculatePriority(char)
				return
			}
		})
		// console.log("SET", set)
	})
}

console.log(rucksacks, priority)
