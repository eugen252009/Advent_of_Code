import { readFileSync } from "fs"

const input = readFileSync("../input.txt").toString().slice(0, -1)
const testinput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

const cubelist = {
	red: 12,
	green: 13,
	blue: 14,
}
console.log(`Part 1 Test:\t${main(testinput)}/8`);
console.log(`Part 1 Output:\t${main(input)}`);

function main(string) {
	let result = 0
	const furtherprocess = parseString(string)
	furtherprocess.games.forEach(item => {
		const test = item.game.every(game => game.valid)
		if (test) { result += item.id }
	})
	return result
}

function parseString(string) {
	const parse = string.split("\n").map(item => {
		const id = parseInt(item.split(":")[0].replaceAll("Game ", ""))
		const game = []
		const games = item.split(":")[1].split(";")
		games.forEach(rounds => {
			const test = rounds.split(",").forEach(element => {
				let color = element.trim().split(" ")[1]
				let amount = element.trim().split(" ")[0];

				const result = { amount, color, valid: cubelist[color] >= amount }
				game.push(result)
			});
			return test

		})
		return { id, game }
	})
	return { games: parse }
}
