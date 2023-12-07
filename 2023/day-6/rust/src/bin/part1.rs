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
    let mut items = input.split("\n");
    // let mut times: Vec<&str> = items.next().map(|line| line.clone().split(":"));
    let mut distances = items
        .into_iter()
        .map(|line| line.clone().split(":").flat_map(|tim| tim.trim()))
        .into_iter()
        .flat_map(|nums| nums.split(""))
        .into_iter()
        .map(|nums| nums.parse());
    // .unwrap();

    result += 30;
    return result;
}
