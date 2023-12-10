fn main() {
    let input = include_str!("../../../input");
    let result = solve(input);
    dbg!(result);
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn testinput() {
        let result = solve(include_str!("../../../testinput"));
        assert_eq!(result, 2)
    }
}

fn solve(input: &str) -> i32 {
    let result = 0;

    let mut lines = input.lines();
    let instruction = lines.nth(0).unwrap().chars();

    for it in instruction {
        dbg!(it);
    }
    let paths = lines
        .map(|path| path.replace("(", "").replace(")", "")).flat_map(|line|line.split_once(" = "))
        .collect::<Vec<_>>();
    dbg!(paths);
    // result = 2;
    return result;
}
