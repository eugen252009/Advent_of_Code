import fs from "fs"
// export const input = fs.readFileSync("input.txt").toString()

export const sample =
	`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`
const rawcrates = sample.split("\n\n")[0]
const rawinstructions = sample.split("\n\n")[1].split("\n")
function deconstruct(rawstring: string) {
	const rawdata = rawstring.split("\n").slice(0, -1).reverse().map(container => {
		return container.replaceAll("   ", "$").replaceAll("[", "").replaceAll("]", "").replaceAll(" ", "")
	})
	const data: string[][] = []
	rawdata.forEach((_, index) => {
		rawdata.forEach((container) => {
			if (data[index] == null) data.push([])
			if (container.charAt(index) === "$") return
			data[index].push(container.charAt(index))
		})
	})
	return data.reverse()
}

const deconstructedCrates = deconstruct(rawcrates)
const instructions = parseinstruction(rawinstructions)
function movecrate(instructions: string[], crates: string[][]) {
	return instructions.map((instruction) => {
		for (let index = 0; index < parseInt(instruction.at(1) ?? "0"); index++) {
			const from = parseInt(instruction.at(2) ?? "0");
			const to = parseInt(instruction.at(3) ?? "0");
			console.log("crates",crates[from].pop(),to)
		}
		return crates
	})
}
function parseinstruction(rawinstructions: string[]) {
	console.log(rawinstructions)
	return rawinstructions.map(instruction => {
		return instruction.replace("move ", "").replace(" from ", "").replace(" to ", "")
	})

}
console.log("Crates/instructions", [deconstructedCrates, instructions])
console.log(movecrate(instructions, deconstructedCrates))
