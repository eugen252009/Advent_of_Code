
/** @param {string} rawInput */
export function part1(rawInput) {
let finalinput = rawInput.toString()
let input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

function solve(inputstring) {
	let counter = 0
	const start = inputstring.split("\n")
	for (const item of start) {
		const items = item.match(/[0-9]/g)
		if (items==undefined){break;}
		const stringcount = items[0] + items[(items.length - 1)]
		counter += parseInt(stringcount)
	}
	return counter
}
console.log(`Test input:\t ${solve(input)} should be 142`)
return solve(finalinput)
}
