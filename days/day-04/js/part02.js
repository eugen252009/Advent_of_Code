import { md5 } from "js-md5"

/** @param {string} input */
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
