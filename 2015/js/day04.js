import assert from "assert";
import { md5 } from "js-md5"
export function Tests() {
	//Part1
	assert(part1("abcdef") === 609043)
	assert(part1("pqrstuv") === 1048970)
	return false
}

export function part1(input) {
	let zeros = 0;
	while (true) {
		let checksum = md5(`${input}${++zeros}`)
		if (checksum.slice(0, 5) === `${"0".repeat(5)}`) {
			break
		}
	}
	return zeros;
}

export function part2(input) {
	let zeros = 0;
	while (true) {
		let checksum = md5(`${input}${++zeros}`)
		if (checksum.slice(0, 6) === `${"0".repeat(6)}`) {
			break
		}
	}
	return zeros;
}

export default { part1, part2, Tests, name: 4 }
