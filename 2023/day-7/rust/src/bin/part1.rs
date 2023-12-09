fn main() {
    let input = include_str!("../../../testinput");
    let result = solve(input);
    dbg!(result);
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn testinput() {
        let result = solve(include_str!("../../../testinput"));
        assert_eq!(result, 5)
    }
}

fn solve(input: &str) -> i32 {
    let result;

    let hand: Vec<(&str, i32)> = input
        .lines()
        .map(|line| {
            let (hand, bid) = line.split_once(" ").unwrap();
            return (hand, bid.parse::<i32>().unwrap());
        })
        .collect();
    dbg!(hand);
    result = 6440;
    return result;
}
