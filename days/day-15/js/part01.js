/** @param {string} rawInput */
export function part1(rawInput) {
const input = rawInput
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

const part1 = input.split(",").reduce((acc, x) => acc + parse(x), 0)

return part1;
}
