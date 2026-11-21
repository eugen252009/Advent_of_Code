function checkifVovel(char) {
	switch (char) {
		case "a":
		case "e":
		case "i":
		case "o":
		case "u":
			return true;
		default:
			return false;
	}
}

function checkForDouble(char1, char2) {
	return char1 === char2
}

function checkForNiceWord(char1, char2) {
	switch (`${char1}${char2}`) {
		case "ab":
		case "cd":
		case "pq":
		case "xy":
			return false;
		default:
			return true;
	}

}

/** @param {string} input */
export function part1(input) {
	const data = input + "\n"
	let containsvovels = 0,
		doubleLetters = 0,
		isNice = true,
		result = 0;
	let word = "";
	for (let index = 0; index < data.length; index++) {
		const element = data[index];
		if (element === "\n") {
			if (containsvovels >= 3 && doubleLetters >= 1 && isNice) {
				result += 1;
			}
			containsvovels = 0;
			doubleLetters = 0;
			isNice = true;
			word = "";
			continue;
		}
		word += element;
		if (checkifVovel(element)) {
			containsvovels++;
		}
		if (checkForDouble(element, data[index + 1])) {
			doubleLetters++;
		}
		if (!checkForNiceWord(element, data[index + 1])) {
			isNice = false;
		}
		while (!isNice) {
			if (data[index] !== "\n") {
				index++;
				break
			}
		}
	}
	return result;
}
