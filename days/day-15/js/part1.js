import { readFileSync } from "fs"
const input = readFileSync("../input", "utf8")
const testinput = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"

const alg = (x) => ((x * 17) % 256)

function parse(chars) {
	let res = 0;
	for (let i = 0; i < chars.length; i++) {
		res += chars[i].charCodeAt();
		res = alg(res)
	}
	return res
}

//part1
const part1 = input.split(",").reduce((acc, x) => acc + parse(x), 0)

//part2
function addAll(acc, x, id, _arr) {
	return acc += Number(x.split("=").at(-1)) * id
}
const tmp = []
const part2 = input
	.split(",")
	.reduce(part2func)
	.reduce(addAll);

function part2func(acc, x) {
	if (x.includes("-")) {
		tmp.filter(y => y != x);
	}
	if (x.includes("=")) {
		tmp.push(x);
	}
	return tmp;
};

console.log({ part1, part2 });
