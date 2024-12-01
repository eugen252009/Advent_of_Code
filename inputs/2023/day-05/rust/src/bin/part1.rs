use std::collections::HashMap;

use nom::Map;

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn solving_puzzle() {
        let input = include_str!("../../../testinput");
        assert_eq!(solve(input), 35);
    }
}

fn main() {
    let testinput = include_str!("../../../input");
    let test = solve(testinput);
    println!("{}", test);
}
#[derive(Debug)]
struct RangeMap {
    from: String,
    to: String,
    maps: Vec<(i64, i64)>,
}
fn solve(input: &str) -> i64 {
    let mut result = 0;

    let lines: Vec<&str> = input.lines().collect();
    let _seeds: Vec<i64> = lines[0]
        .split_once(": ")
        .unwrap()
        .1
        .split(" ")
        .map(|num| num.parse::<i64>().unwrap())
        .collect();

    let map: Vec<_> = input
        .split("\n\n")
        .into_iter()
        .filter_map(|f| {
            let Some((fromraw,rawseeds))=f.split_once(":") else {todo!("");};
            if fromraw != "seeds" {
                let Some((from, to)) = fromraw.split_once(" map").unwrap().0.split_once("-to-") else {todo!("");};
                let range:Vec<_> = rawseeds.split("\n").map(|nums|nums.split(" ")).filter_map(|mut num|{
                    let num1 = num.next();
                    let num2 = num.next();
                    let num3 = num.next();
                    if!( num1==None ||num2 ==None ||num3==None) {
                        let int1=num1.unwrap().parse::<i64>();
                        let int2=num2.unwrap().parse::<i64>();
                        let int3=num3.unwrap().parse::<i64>();
                        Some((int1.unwrap(),int2.unwrap(),int3.unwrap())) 
                    }else{
                    None
                    }
                }
                ).collect();
                // dbg!(range);
                let map = RangeMap{from:from.to_string(),to:to.to_string(),maps:vec![(0,0)]};

            return Some(map)
            }
            return None;
        })
        .collect();
    // dbg!(map);
    result += 30;

    return result;
}
