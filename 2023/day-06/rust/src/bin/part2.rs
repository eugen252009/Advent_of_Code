#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn solving() {
        let input = "Time:      7  15   30
Distance:  9  40  200";
        let result = 71503;
        assert_eq!(solve(input), result);
    }
}

fn main() {
    let input = include_str!("../../../input");
    let result = solve(input);
    println!("{}", result);
}

fn solve(input: &str) -> i32 {
    let mut result = 0;
    let items = input.split_once("\n").unwrap();
    let distance = items
        .1
        .split_once(": ")
        .unwrap()
        .1
        .trim()
        .split(" ")
        .filter(|f| {
            if f == &"" {
                return false;
            }
            return true;
        })
        .collect::<Vec<&str>>();
    let mut distances = "".to_owned();
    for ele in distance {
        distances.push_str(ele)
    }
    let distancenum = distances.parse::<i64>().unwrap();
    let times = items
        .0
        .split_once(": ")
        .unwrap()
        .1
        .trim()
        .split(" ")
        .filter(|f| {
            if f == &"" {
                return false;
            }
            return true;
        })
        .collect::<Vec<&str>>();
    let mut timestr = "".to_owned();
    for ele in times {
        timestr.push_str(ele)
    }
    let timenum = timestr.parse::<i64>().unwrap();
    for item in 1..(timenum as usize) {
        let racetime = timenum - item as i64;
        let raceddistance = racetime * item as i64;
        if raceddistance > distancenum {
            result += 1;
        }
    }
    return result;
}
