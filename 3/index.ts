// @ts-ignore
import fs from "node:fs"
const input = fs.readFileSync("input.txt").toString()
const sample = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const data = sample.split("\n")
const rucksacks = data.map((rucksack) => [
	rucksack.slice(0, rucksack.length / 2),
	rucksack.slice(rucksack.length / 2),
])
console.log(rucksacks)
