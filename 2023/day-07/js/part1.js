import { readFileSync } from "fs"
const input = readFileSync("../testinput", "utf8").slice(0, -1).split("\n").map(games => games.split(" "));
const sortlist = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"].reverse()
solve(input)
function solve(input) {
	const rawHands = input
	const parsedHands = []
	for (const hand of rawHands) {
		parsedHands.push(parseHand(hand))
	}
	console.log("sort ", sort(parsedHands))
}

function parseHand(cards) {
	const input = cards[0].split("")
	const dict = {}
	input.forEach(element => {
		if (dict[element] == undefined) {
			dict[element] = 1
		} else {
			dict[element] += 1
		}
	});
	const num = Object.entries(dict)
		.reduce((acc, val) => {
			return Math.max(acc, val[1])
		}, 0)
	return [...cards, dict, num]
}

function sort(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < (arr.length - i - 1); j++) {
			if (arr[j][3] < arr[j + 1][3]) {
				let temp = arr[j]
				arr[j] = arr[j + 1]
				arr[j + 1] = temp
			}
			if (arr[j][3] === arr[j + 1][3]) {
				for (let i = 0; i < arr.length; i++) {
					const one = sortlist.indexOf(arr[j][0][i])
					const two = sortlist.indexOf(arr[j][0][i + 1])
					if ()
					console.log({one,two})
				}
			}
		}
	}
	return arr
}
