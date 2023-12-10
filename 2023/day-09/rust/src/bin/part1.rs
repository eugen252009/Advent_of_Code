fn main() {
    let result: i32 = include_str!("../../../input")
        .lines()
        .map(|line| solve(line))
        .sum();
    println!("{}", result)
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn testinput() {
        let result: i32 = include_str!("../../../testinput")
            .lines()
            .map(|line| solve(line))
            .sum();
        assert_eq!(result, 114)
    }
}

fn solve(input: &str) -> i32 {
    let i = input
        .split(" ")
        .flat_map(|i| i.split(" ").map(|num| num.parse::<i32>().unwrap()))
        .collect::<Vec<i32>>();
    let _data = make_table(&i);
    return i.iter().sum();
}
fn make_table(data: &Vec<i32>) -> &Vec<i32> {
    let i = data.len();
    let mut j = 0;
    while j < i {
        j += 1;
    }
    for num in data {
        dbg!(num);
    }
    return data;
}
