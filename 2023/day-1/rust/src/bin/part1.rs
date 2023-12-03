use regex::Regex;
fn main() {
    let input = include_str!("../../../input.txt");
    let test_input = "1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet";
    // println!("Test Input:\t{},\tNeeds:{}", solve(test_input), 142);
    // println!("Final Input:\t{}", solve(input));
    println!("{}", newapproach(test_input));
}

fn solve(inputstr: &str) -> i32 {
    let lines: Vec<&str> = inputstr.split("\n").collect();
    let number_regex = Regex::new(r"\d").unwrap();
    let mut count = 0;
    for line in lines {
        let mut numbers = String::from("");
        for number in number_regex.find_iter(line) {
            numbers.push_str(number.as_str());
        }
        let len = numbers.len();

        if let Some(first_char) = numbers.chars().nth(0) {
            if let Some(last_char) = numbers.chars().nth(len - 1) {
                if let Ok(number) = format!("{}{}", first_char, last_char).parse::<i32>() {
                    count += number;
                }
                // println!("{}", count);
            };
        }
    }
    count
}

fn newapproach(input: &str) -> i32 {
    let result =0
    let item = for ele in input.lines().map(|line| line.split(":").nth(0).unwrap()) {
        println!("{}", ele);
    };
    result
}
