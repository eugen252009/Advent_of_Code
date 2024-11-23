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


// --- Part Two ---
// Realizing the error of his ways, Santa has switched to a better model of determining whether a string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.
//
// Now, a nice string is one with all of the following properties:
//
// It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
// It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
// For example:
//
// qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).
// xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.
// uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.
// ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.
