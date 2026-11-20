use std::usize;

fn main() {
    // let input = include_str!("../../../input");
    let test_input = "467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..";
    println!("Test Input:\t{}\tNeeds:\t{}", solve(test_input), 4361);
    println!("dots?{}",check_for_dots(0, "%"));
    // println!("Final Input:\t{}", solve(input));
}
struct Number {
    id: usize,
    x: usize,
    y: usize,
    num: char,
    items: Vec<char>,
}

fn solve(input: &str) -> usize {
    let mut result: usize = 0;
    let mut found: Vec<Number> = Vec::new();
    let width = input
        .lines()
        .nth(0)
        .unwrap()
        .replace("\n", "")
        .chars()
        .count();
    for (idx, chars) in input.chars().enumerate() {
        let mut itemchar: Vec<char> = Vec::new();
        if check_for_dots(idx, input) {
            continue;
        }
        if left_free(idx, width) {
            if !check_for_dots(idx - 1, input) {
            itemchar.push(input.chars().nth(idx - 1).unwrap());
            }
        }
        if right_free(idx, width) {
            if !check_for_dots(idx + 1, input) {
            itemchar.push(input.chars().nth(idx + 1).unwrap());
            }
        }
        if top_free(idx, width) {
            if !check_for_dots(idx - width, input) {
            itemchar.push(input.chars().nth(idx - width).unwrap());
            }
        }
        if below_free(idx, width, input) {
            if !check_for_dots(idx + width, input) {
            itemchar.push(input.chars().nth(idx + width).unwrap());
            }
        }
        if left_free(idx, width) && top_free(idx, width) {
            if !check_for_dots(idx - width - 1, input) {
            itemchar.push(input.chars().nth(idx - width - 1).unwrap());
            }
        }
        if right_free(idx, width) && top_free(idx, width) {
            if !check_for_dots(idx - width + 1, input) {
            itemchar.push(input.chars().nth(idx - width + 1).unwrap());
            }
        }
        if left_free(idx, width) && below_free(idx, width, input) {
            if !check_for_dots(idx + width - 1, input) {
            itemchar.push(input.chars().nth(idx + width - 1).unwrap());
            }
        }
        if right_free(idx, width) && below_free(idx, width, input) {
            if !check_for_dots(idx + width + 1, input) {
            itemchar.push(input.chars().nth(idx + width + 1).unwrap());
            }
        }
        print!(
            "{}\t{}:{}\t{}\t{}{{",
            idx,
            idx % width,
            idx / width,
            chars,
            itemchar.iter().count()
        );
        for i in &itemchar {
            print!(" {} ", i);
        }
        println!(" }} ");

        if chars.is_digit(10) && itemchar.iter().count() > 0 {
            found.push(Number {
                id: idx,
                x: idx % width,
                y: idx / width,
                num: chars,
                items: itemchar,
            });
        }
        found.clear();
    }

    return findnum(found);
}

fn top_free(idx: usize, width: usize) -> bool {
    idx / width > 0
}

fn left_free(idx: usize, width: usize) -> bool {
    idx % width > 0
}
fn right_free(idx: usize, width: usize) -> bool {
    idx % width < 8
}
fn below_free(idx: usize, width: usize, input: &str) -> bool {
    idx + width < input.chars().count()
}
fn check_for_dots(idx: usize, text: &str) -> bool {
    text.chars().nth(idx).unwrap() == '.'
        || text.chars().nth(idx).unwrap() == '\n'
}

fn findnum(input: Vec<Number>) -> usize {
    let mut sum = 0;
    for number in input.iter() {
        sum += number.num.to_digit(10).unwrap_or(0) as usize;
    }

    sum
}
