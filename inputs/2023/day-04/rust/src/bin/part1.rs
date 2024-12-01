fn main() {
    let input = include_str!("../../../input");
    let testinput = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11";

    // println!("{}:{}", solve(testinput), 13);
    println!("{}", solve(input));
}

fn solve(input: &str) -> i32 {
    let mut result = 0;
    let lines = input.lines();
    for line in lines {
        let mut preres = 0;
        if line.len() == 0 {
            continue;
        }
        let Some(game) = line.split(": ").nth(1) else{
        continue;
        };
        let mut parts = game.split(" | ");
        let mut winning = 0;
        let part1: Vec<&str> = parts.next().unwrap().split(" ").collect();
        let part2: Vec<&str> = parts.next().unwrap().split_whitespace().collect();
        for num in part1 {
            if part2.contains(&num) {
                winning += 1;
            };
        }
        for _ in 0..winning {
            if preres == 0 {
                preres += 1;
            } else {
                preres *= 2;
            }
        }
        result += preres;
    }
    return result;
}
