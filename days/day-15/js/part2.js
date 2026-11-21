export default function part2(rawInput) {
const input = rawInput;
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

return part2;

}
