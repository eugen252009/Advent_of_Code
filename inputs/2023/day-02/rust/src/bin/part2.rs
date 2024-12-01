use std::cmp;

fn main() {
    let input = include_str!("../../../input.txt");
    let test_input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";
    println!("Test Input:\t{}\tNeeds:\t{}", solve(test_input), 2286);
    println!("Final Input:\t{}", solve(input) );
}

fn solve(inputstr: &str) -> i32 {
    let mut result = 0;
    for line in inputstr.lines() {
        let mut minimal_cubes: MinCubes = MinCubes {
            green: 0,
            blue: 0,
            red: 0,
        };
        let games = line.split(":").nth(1).unwrap().split(";");
        for game in games {
            let round = game.split(",");
            for oner in round {
                let parsed_round = parse_rounds(oner);
                minimal_cubes.blue = cmp::max(minimal_cubes.blue, parsed_round.blue);
                minimal_cubes.red = cmp::max(minimal_cubes.red, parsed_round.red);
                minimal_cubes.green = cmp::max(minimal_cubes.green, parsed_round.green);
            }
        }
        result += minimal_cubes.red * minimal_cubes.blue * minimal_cubes.green;
    }
    return result;
}
struct MinCubes {
    green: i32,
    blue: i32,
    red: i32,
}
fn parse_rounds(round: &str) -> MinCubes {
    let mut min: MinCubes = MinCubes {
        green: (0),
        blue: (0),
        red: (0),
    };
    let cubeamount: i32 = round.split(" ").nth(1).unwrap().parse().unwrap();
    let color = round.split(" ").nth(2).unwrap();
    if color == "green" {
        min.green = cubeamount;
    }
    if color == "red" {
        min.red = cubeamount;
    }
    if color == "blue" {
        min.blue = cubeamount;
    }
    return min;
}
