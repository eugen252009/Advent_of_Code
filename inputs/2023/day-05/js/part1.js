const print = 0
import { readFileSync } from "fs";
function log(...a) {
	if (print)
		for (const item of a) {
			console.log(item)
		}
}
let input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`
input = readFileSync("../input", "utf8").slice(0, -1);
const string = preprocessstring(input)
console.log(string.reduce((x, acc) => x < acc ? x : acc))
function preprocessstring(input) {
	const res = input.split("\n\n")
		.map(line => line.split(":")
			.map(line => line.replaceAll(" map", "")
				.replaceAll("\n", " ")
				.trim()))
	const seed = res.shift()[1].split(" ");
	const dict = createDict(res);
	const data = []
	for (const s of seed) {
		data.push(walk(parseInt(s), dict, "seed"))
		log("")
	}
	return data
}
function createDict(data) {
	const dict = [];
	for (const item of data) {
		const [from, _, to] = item[0].split("-")
		const path = parsePath(item[1])
		dict.push({ from, to, path })
	} return dict
}

function parsePath(int) {
	const path = []
	const data = int.split(" ")
	const tmp = []
	for (let index = 0; index < data.length; index++) {
		const element = data[index];
		tmp.push(element)
	}
	for (let i = 0; i < tmp.length; i += 3) {
		let [one, two, three] = tmp.slice(i, i + 3);
		// log(
		// 	{
		// 		destinationmin: +one,
		// 		destinationmax: (+one + +three - 1),
		// 		sourcerangemin: +two,
		// 		sourcerangemax: (+two + +three - 1),
		// 	}
		// )
		path.push(
			{
				destmin: +one,
				destmax: (+one + (+three)),
				srcmin: +two,
				srcmax: (+two + (+three)),
			}
		)
	}
	return path
}
function walk(value, dict, name) {
	if (name == undefined) return value;
	let dictionary = undefined
	for (const item of dict) {
		if (item.from === name) {
			dictionary = item
		}
	}
	if (dictionary == undefined) return value;
	if (dictionary.to == undefined) return value;
	const newName = dictionary.to;
	for (let i = 0; i < dictionary.path.length; i++) {
		log({ value, min: dictionary.path[i].srcmin, max: dictionary.path[i].srcmax });
		if (dictionary.path[i].srcmin <= value && dictionary.path[i].srcmax > value) {
			const newValue = ((value - dictionary.path[i].srcmin) + dictionary.path[i].destmin);
			log({ name, value, newName, newValue });
			return walk(newValue, dict, newName);
		}
	}
	// log(`Nothing found ${value}`);
	return walk(value, dict, newName);
}
