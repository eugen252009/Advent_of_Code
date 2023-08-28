import fs from "fs"
const input = fs.readFileSync("input.txt").toString()
const sample = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`
let priority = 0
const data = input.split("\n") as string[]
const rucksacks = data.map((rucksack) => [
	rucksack.slice(0, rucksack.length / 2),
	rucksack.slice(rucksack.length / 2),
])

function calculatePriority(string: string) {
	// console.log("found: " + string, string.charCodeAt(0))
	let prioritynum = 0
	if (string === string.toLowerCase()) {
		prioritynum = string.charCodeAt(0) - 96
	}
	if (string === string.toUpperCase()) {
		prioritynum = string.charCodeAt(0) - 64 + 26
	}
	priority += prioritynum
}

// checkforDouble(rucksacks)
function checkforDouble(arr: string[][]) {
	return arr.map((item) => {
		let found = false
		const [firsthalf, secondhalf] = item
		console.log(firsthalf, secondhalf)
		let set = new Set(firsthalf.split(""))
		return secondhalf.split("").map((char) => {
			if (!found && set.has(char)) {
				// found = !found
				// calculatePriority(char)
				return char
			}
		})
		// console.log("SET", set)
	})
}

// console.log(rucksacks, priority)
const group: string[][] = []
// day 2
for (let index = 0; index + 3 <= data.length; index += 3) {
	group.push([data[index], data[index + 1], data[index + 2]])
}

function checkforMultiple(groups: string[][]) {
	let result: string[] = []
	console.log(group)

	groups.forEach((group) => {
		// @ts-ignore
		const one = scheckforDoubles(group[0].split(""), group[1].split(""))
		const two = scheckforDoubles(group[2].split(""), group[1].split(""))
		// @ts-ignore
		result.push(scheckforDoubles(one, two))
	})

	result.forEach((res) => {
		calculatePriority(res[0])
	})
	// @ts-ignore
	return result
}
console.log(checkforMultiple(group), priority)
// checkRucksacks(group[0])
function checkforDoubles(arr: string[][]) {
	let result: string[] = []
	arr.map((item) => {
		const [firsthalf, secondhalf] = item
		console.log(firsthalf, secondhalf)
		let set = new Set(firsthalf.split(""))
		secondhalf.split("").map((char) => {
			if (set.has(char)) {
				result.push(char)
			}
		})
		// console.log("SET", set)
	})
	return result
}

function scheckforDoubles(arr: string[], arr2: string[]) {
	const result: string[] = []

	const set = new Set()
	arr.forEach((item) => {
		arr2.forEach((item2) => {
			if (item === item2) {
				// @ts-ignore
				set.add(item2)
			}
		})
	})
	// @ts-ignore
	set.forEach((item) => result.push(item))
	return result
}
