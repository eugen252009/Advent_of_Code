import { Day, printHead } from "./utils/js/day.js";
import day01 from "./solutions/js/2024_01.js";

const year = 2024;
const AOCDays = [];

for (let index = 1; index < 26; index++) {
	const day = new Day(day01, { year, day: index }).execute();
	if (day.input !== "") {
		AOCDays.push(day);
	}
}

printHead();
AOCDays.map((x) => {
	x.print();
});
console.log();
console.log(
	"All Days took: " +
		Math.floor(
				AOCDays.reduce((acc, item) => {
					return item.accumulatedTime + acc;
				}, 0) * 1000,
				"ms",
			) / 1000,
);
