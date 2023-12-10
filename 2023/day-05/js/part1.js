import { readFileSync } from "fs"
const input = readFileSync("../input", "utf8").slice(0, -1);

const string = preprocessstring(input)
solve(string)
function solve(input) {
	console.log(input.sort((a, b) => a - b)[0])
}
function preprocessstring(input) {
	const res = input.split("\n\n").map(line => line.split(":").map(line => line.replaceAll(" map", "").replaceAll("\n", " ").trim()))
	const seed = res.shift()[1].split(" ")
	const dict = createDict(res)
	// console.log(dict.filter(dict=>dict.from=="light"))
	const data = []
	for (const s of seed) {
		data.push(walk(parseInt(s), dict, "seed"))
	}
	return data
}
function createDict(data) {
	const dict = []
	for (const item of data) {
		const [from, _, to] = item[0].split("-")
		const path = parsePath(item[1])
		// console.log(path)
		dict.push({ from, to, path })
	}
	return dict
}

function parsePath(int) {
	const data = int.split(" ").map(num => parseInt(num))
	// console.log(data,int)
	const res = []
	for (let index = 0; index <= data.length; index++) {
		const [dest, source, range] = [data.shift(), data.shift(), data.shift()]
		res.push([dest, source, range])
	}
	const map = res.map(item => generateMap(item[0], item[1], item[2]))

	const mergedMap = mergeMaps(map)
	// console.log(mergedMap)
	return mergedMap
}
function generateMap(dest, source, range) {
	const map = {}
	for (let i = 0; i < range; i++) {
		map[source + i] = dest + i
	}
	return map
}
function mergeMaps(maps) {
	const map = {}
	maps.map(element => {
		Object.assign(map, element)
	});
	return map
}
function walk(value, dict, name) {
	// console.log({ value, name })
	// if (name == undefined) return value
	const dictionary = dict.find((item) => item.from === name)
	if (dictionary?.to == undefined) return value
	const newName = dictionary.to
	const newVal = dictionary.path[value] ?? value
	// console.log({ value, newval: newVal, newName })
	return walk(newVal, dict, newName)
}
