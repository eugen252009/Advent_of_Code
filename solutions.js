import { Day, printHead } from "./utils/js/day.js";
import day01 from "./solutions/js/2024_01.js";
import day02 from "./solutions/js/2024_02.js";
import day04 from "./solutions/js/2024_04.js";

const year = 2024;
const AOCDays = [];
// AOCDays.push(new Day(day01, { year, day: 1 }).execute());
// AOCDays.push(new Day(day02, { year, day: 2 }).execute());
AOCDays.push(new Day(day04, { year, day: 4 }).execute());

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
