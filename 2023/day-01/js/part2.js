const fs = require("fs")
let finalinput = fs.readFileSync("../input.txt").toString()
let input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`
function solve(inputstring) {
	let counter = 0
	const start = inputstring.split("\n")
	for (const item of start) {
		const preprocessedstr = findallOccurencys(item)
		const items = preprocessedstr.match(/[0-9]/g)
		if (items == undefined) continue
		const stringcount = items[0] + items[(items.length - 1)]
		counter += parseInt(stringcount)
	}
	return counter
}

function findallOccurencys(str) {
	let result = str
	result = result.replaceAll(/(one)/g, "o1ne")
		.replaceAll(/(two)/g, "t2wo")
		.replaceAll(/(three)/g, "t3hree")
		.replaceAll(/(four)/g, "f4our")
		.replaceAll(/(five)/g, "f5ive")
		.replaceAll(/(six)/g, "s6ix")
		.replaceAll(/(seven)/g, "s7even")
		.replaceAll(/(eight)/g, "e8ight")
		.replaceAll(/(nine)/g, "n9ine")
	return result
}
console.log(`Test input:\t${solve(input)} should be 281`)
console.log(`Final input:\t${solve(finalinput)}`)
