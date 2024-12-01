const RED: i32 = 12;
const GREEN: i32 = 13;
const BLUE: i32 = 14;

fn main() {
    let input = include_str!("../../../input.txt");
    let test_input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";
    println!("Test Input:\t{}\tNeeds:\t{}", solve(test_input), 8);
    println!("Final Input:\t{}", solve(input));
}

fn solve(inputstr: &str) -> i32 {
    let mut result = 0;
    for line in inputstr.lines() {
        let id: i32 = line
            .split(":")
            .nth(0)
            .unwrap()
            .replace("Game ", "")
            .parse()
            .unwrap();
        let games = line.split(":").nth(1).unwrap().split(";");
        let mut allgames = Vec::new();
        for game in games {
            let round = game.split(",");
            for oner in round {
                let parsed_round = parse_rounds(oner);
                allgames.push(parsed_round);
            }
        }
        let mut allvalid = true;
        for validgames in allgames {
            if !validgames.valid {
                allvalid = false;
            }
        }
        if allvalid {
            result += id;
        }
    }
    return result;
}
struct Round {
    valid: bool,
}
fn parse_rounds(round: &str) -> Round {
    let cubeamount: i32 = round.split(" ").nth(1).unwrap().parse().unwrap();
    let color = round.split(" ").nth(2).unwrap();
    let mut valid = false;
    if color == "green" {
        valid = GREEN >= cubeamount;
    }
    if color == "red" {
        valid = RED >= cubeamount;
    }
    if color == "blue" {
        valid = BLUE >= cubeamount;
    }
    return Round { valid };
}
