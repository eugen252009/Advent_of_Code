fn main() {
    let text = include_str!("../../input.txt");
    let result = solve_day1(&text);
    let result2 = solve_day2(&text);
    println!("Day 1: {result}");
    println!("Day 2: {result2}");
}

fn solve_day1(text: &str) -> i64 {
    let mut result = 0;
    'outer: for line in text.split("\n") {
        if line.len() < 1 {
            continue;
        }
        let mut items: Vec<i64> = Vec::new();
        for num in line.split(" ") {
            let res = num.parse::<i64>();
            match res {
                Ok(n) => items.push(n),
                Err(x) => {
                    println!("An Error occured with number:{num} {x}");
                    return 0;
                }
            }
            if !check_level_dir(&items) || !check_distance(&items) {
                continue 'outer;
            }
        }
        result += 1;
    }
    return result;
}
fn solve_day2(text: &str) -> i64 {
    let mut result = 0;
    for line in text.split("\n") {
        if line.len() < 1 {
            continue;
        }
        let mut items: Vec<i64> = Vec::new();
        for num in line.split(" ") {
            let res = num.parse::<i64>();
            match res {
                Ok(n) => items.push(n),
                Err(x) => {
                    println!("An Error occured with number:{num} {x}");
                    return 0;
                }
            }
            if !check_level_dir(&items) || !check_distance(&items) {
                continue;
            }
        }

        println!("{line}");
        result += 1;
    }
    return result;
}

fn check_distance(items: &Vec<i64>) -> bool {
    let mut before = 0;
    for (id, value) in items.iter().enumerate() {
        if id == 0 {
            before = *value;
            continue;
        }
        let absvalue = (before - value).abs();
        if !(absvalue <= 3 && absvalue >= 1) {
            return false;
        }
        before = value.to_string().parse::<i64>().unwrap();
    }
    return true;
}
fn check_level_dir(items: &Vec<i64>) -> bool {
    let mut before = 0;
    let mut accending = true;
    let mut decending = true;
    for (id, value) in items.iter().enumerate() {
        if id == 0 {
            before = *value;
            continue;
        }
        if before > *value {
            accending &= false;
        } else {
            decending &= false;
        }
        before = *value;
    }
    if !accending && !decending {
        return false;
    } else {
        return true;
    }
}

#[cfg(test)]
mod tests {
    struct TestCase {
        text: &'static str,
        result: i64,
    }
    use super::*;

    const DAY1TESTS: [TestCase; 6] = [
        TestCase {
            text: "7 6 4 2 1",
            result: 1,
        },
        TestCase {
            text: "1 2 7 8 9",
            result: 0,
        },
        TestCase {
            text: "9 7 6 2 1",
            result: 0,
        },
        TestCase {
            text: "1 3 2 4 5",
            result: 0,
        },
        TestCase {
            text: "8 6 4 4 1",
            result: 0,
        },
        TestCase {
            text: "1 3 6 7 9",
            result: 1,
        },
    ];
    const DAY2TESTS: [TestCase; 6] = [
        TestCase {
            text: "7 6 4 2 1",
            result: 1,
        },
        TestCase {
            text: "1 2 7 8 9",
            result: 0,
        },
        TestCase {
            text: "9 7 6 2 1",
            result: 0,
        },
        TestCase {
            text: "1 3 2 4 5",
            result: 1,
        },
        TestCase {
            text: "8 6 4 4 1",
            result: 1,
        },
        TestCase {
            text: "1 3 6 7 9",
            result: 1,
        },
    ];

    #[test]
    fn day_1_test() {
        for (id, items) in DAY1TESTS.iter().enumerate() {
            println!("Test ID: {id}");
            let result = solve_day1(items.text);
            assert_eq!(result, items.result);
        }
    }

    #[test]
    fn day_2_test() {
        for (id, items) in DAY2TESTS.iter().enumerate() {
            println!("Test ID: {id}");
            let result = solve_day2(items.text);
            assert_eq!(result, items.result);
        }
    }
}
