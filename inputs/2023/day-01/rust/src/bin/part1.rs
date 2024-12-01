use std::usize;

use regex::Regex;
fn main() {
    let input = include_str!("../../../input");
    let testinput = "1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet";
    // println!("Test Input:\t{},\tNeeds:{}", solve(test_input), 142);
    println!("Final Input:\t{}", solve(input));
    println!("Final Input:\t{}", solve2(testinput));
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
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn it_works() {
        let testinput = "1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet";
        assert_eq!(solve2(testinput), 281);
    }
}

// fn solve2(input: &str) -> usize {
//     let mut finalres = 0;
//     let mut result = input
//         .lines()
//         .map(|line| line.chars().filter(|char| char.is_digit(10)))
//         .map(|f| f.map(|d| d.to_digit(10).unwrap()));
//     let i = result.clone().count() / 2;
//     let mut x = 0;
//     while x < i {
//         let num1 = result.next().unwrap();
//         let num2 = result.next().unwrap();
//         finalres += num1 * 10 + num2;
//         println!("{}{} {}", num1, num2, finalres);
//         x += 1;
//     }
//     return finalres as usize;
// }
