import { equal } from "assert/strict"

export function Tests() {
	equal(part1("aaa"), 1);
	equal(part1("ugknbfddgicrmopn"), 1);

	equal(part1("jchzalrnumimnmhp"), 0);
	equal(part1("haegwjzuvuyypxyu"), 0);
	equal(part1("haegwjzuvuyypxyu"), 0);

	// Part 2
	equal(part2("qjhvhtzxzqqjkmpb"), 1);
	equal(part2("xxyxx"), 1);

	equal(part2("uurcxstgmygtbstg"), 0);
	// assert(part2("ieodomkazucvgmuy") === 0);

}

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

export default { part1, part2, Tests, name: 5 }
