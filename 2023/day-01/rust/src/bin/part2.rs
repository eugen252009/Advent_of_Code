use regex::Regex;
fn main() {
    let input = include_str!("../../../input.txt");
    let test_input = "two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen";
    println!("Test Input:\t{},\tNeeds:{}", solve(test_input), 281);
    println!("Final Input:\t{}", solve(input));
}

fn solve(inputstr: &str) -> i32 {
    let lines: Vec<&str> = inputstr.split("\n").collect();
    let number_regex = Regex::new(r"\d").unwrap();
    let mut count = 0;
    for line in lines {
        let teststring = line
            .replace("one", "o1ne")
            .replace("two", "t2wo")
            .replace("three", "t3hree")
            .replace("four", "f4our")
            .replace("five", "f5ive")
            .replace("six", "s6ix")
            .replace("seven", "s7even")
            .replace("eight", "e8ight")
            .replace("nine", "n9ine");
        let mut numbers = String::from("");
        for number in number_regex.find_iter(&teststring) {
            numbers.push_str(number.as_str());
        }
        let len = numbers.len();
        if let Some(first_char) = numbers.chars().nth(0) {
            if let Some(last_char) = numbers.chars().nth(len - 1) {
                if let Ok(number) = format!("{}{}", first_char, last_char).parse::<i32>() {
                    count += number;
                }
            };
        }
    }
    count
}
