import { md5 } from "js-md5"

/** @param {string} input */
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
