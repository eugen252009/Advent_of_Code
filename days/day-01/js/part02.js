/** @param {string} input */
export function part2(input) {
	const data = input
		.split("\n")
		.map(
			(x) => x.split("   "),
		)
		.map((
			x,
		) => [parseInt(x[0]), parseInt(x[1])]);
	const left = [];
	const right = [];
	const lefter = {};
	const righter = {};
	let result = 0;

	for (const iter of data) {
		// add all Items to an Array/Map
		if (lefter[iter[0]] == undefined) lefter[iter[0]] = 1;
		else lefter[iter[0]]++;
		if (righter[iter[1]] == undefined) righter[iter[1]] = 1;
		else righter[iter[1]]++;

		left.push(iter[0]);
		right.push(iter[1]);
	}
	for (let index = 0; index < left.length; index++) {
		const leftelement = left[index];
		result += leftelement * (righter[leftelement] ?? 0);
	}
	return result;
}
