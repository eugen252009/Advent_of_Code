fn main() {
    // let input = include_str!("../../../input");
    // println!("{}", solve(input));
    let testinput = include_str!("../../../testinput");
    let test = solve(testinput);
    println!("{}:{}", test, test == 35);
    // println!("{}:{}", solve(testinput)/ 35);
}

fn solve(input: &str) -> i32 {
    let mut result = 0;
    let items: Vec<String> = input
        .split("\n\n")
        .filter_map(|filter| Some(filter.replace("\n", " ")))
        .flat_map(|filtered| filtered.split(": ").map(String::from).collect::<Vec<_>>())
        .collect();
    for i in items {
        println!("{}", i);
    }
    result += 30;
    return result;
}
