import assert from "assert/strict"
export function Tests() {
	assert(part1("aaa\n") === 1);
	// assert(part1(part1("ugknbfddgicrmopn\n") === 1));
	// assert(part1("ugknbfddgicrmopn\n") === 1)
	// assert(part1("jchzalrnumimnmhp\n") === 0)
	// assert(part1("haegwjzuvuyypxyu\n") === 0)
	// assert(part1("dvszwmarrgswjxmb\n") === 0)
}

export function part1(input) {
	let containsvovels = 0,
		doubleLetters = 0,
		notNice = false;
	let result = 0;
	for (let index = 0; index < input.length; index++) {
		const element = input[index];
		if (element === "\n") {
			if (containsvovels >= 3 && doubleLetters > 0 && !notNice) {
				result++;
			}
			containsvovels = 0;
			doubleLetters = 0;
			notNice = true;
			continue;
		}
		switch (element) {
			case "a":
			case "e":
			case "i":
			case "o":
			case "u":
				containsvovels++;
				break;
		}
		if (index > 0) {
			if (element === input[index - 1]) {
				doubleLetters++;
			}
			switch (`${input[index - 1]}${element}`) {
				case "ab":
				case "cd":
				case "pq":
				case "xy":
					notNice = true
					continue
			}
		}
	}
	return result;
}

export function part2(input) {
	return -1;
}

export default { part1, part2, Tests, name: 5 }
