function checkForDuplicates(word) {
	const set = new Set();
	for (let i = 0; i < word.length - 1; i++) {
		if (set.has(`${word[i]}${word[i + 1]}`)) {
			// console.log(`${word[i - 4]}${word[i - 3]}` !== `${word[i - 1]} + ${word[i]}`, `${word[i - 1]}${word[i]}`, word)
			if (i > 4 && `${word[i - 3]}${word[i - 2]}` !== `${word[i - 1]} + ${word[i]}`) {
				// console.log(`${word[i]}${word[i + 1]}`, `${word[i - 3] + word[i - 2]}`)
				return true
			} else {
				continue
			}
		}
		set.add(`${word[i]}${word[i + 1]}`)
	}
	// console.log(set)
	return false
}

/** @param {string} input */
export function part2(input) {
	const data = input + "\n"
	let result = 0;
	let word = "";
	for (let index = 0; index < data.length; index++) {
		const element = data[index];
		if (element === "\n") {
			if (checkForDuplicates(word)) {
				result += 1;
			}
			word = "";
			continue;
		}
		word += element;

		continue;
	}
	return result;
}
