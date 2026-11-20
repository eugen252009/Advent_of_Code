#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn solving() {
        let input = "Time:      7  15   30
Distance:  9  40  200";
        let result = 288;
        assert_eq!(solve(input), result);
    }
}

fn main() {
    let input = include_str!("../../../input");
    let result = solve(input);
    println!("{}", result);
}

fn solve(input: &str) -> i32 {
    let mut result = 1;
    let items = input.split_once("\n").unwrap();
    let distances: Vec<_> = items
        .1
        .split_once(": ")
        .unwrap()
        .1
        .trim()
        .split(" ")
        .filter_map(|num| {
            if num == "" {
                return None;
            }
            Some(num.parse::<i64>().unwrap())
        })
        .collect();
    let times: Vec<_> = items
        .0
        .split_once(": ")
        .unwrap()
        .1
        .trim()
        .split(" ")
        .filter_map(|num| {
            if num == "" {
                return None;
            }
            Some(num.parse::<i64>().unwrap())
        })
        .collect();

    for (id, time) in times.iter().enumerate() {
        let mut tmp = 0;
        let distance = &distances.get(id).unwrap();

        for item in 1..*time {
            let racetime = time - item;
            let raceddistance = racetime * item;
            // dbg!(item, racetime, raceddistance);
            if raceddistance > **distance {
                tmp += 1;
            }
        }
        result *= tmp;
    }
    return result;
}
