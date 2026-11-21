/** @param {string} input */
export function part1(input) {
	// const data = input.split("\n");
	return data.reduce((acc, level, id, arr) => {
		if (arr[id]) console.log(level);
		acc.push(id);
		return acc;
	}, []).length;
}
