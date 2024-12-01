import { readFileSync } from "fs"

const input = readFileSync("../input.txt").toString().slice(0, -1)
const testinput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

console.log(`Part 2 Test:\t${main(testinput)}/2286`);
console.log(`Part 2 Output:\t${main(input)}`);


function main(string) {
	return parseString(string)
}

function parseString(input) {
	let result = 0
	const cubelist = {
		red: 0,
		green: 0,
		blue: 0,
	}
	input.split("\n").map(item => {
		cubelist.green = 0
		cubelist.red = 0
		cubelist.blue = 0

		const games = item.split(":")[1].split(";")
		games.forEach(game => {
			game.split(",").forEach(round => {
				let color = round.trim().split(" ")[1]
				let amount = parseInt(round.trim().split(" ")[0]);
				cubelist[color] = Math.max(cubelist[color], amount)
			});
		})
		result += cubelist.red * cubelist.blue * cubelist.green
	})
	return result
}
