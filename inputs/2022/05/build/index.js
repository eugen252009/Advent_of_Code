"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample = void 0;
// export const input = fs.readFileSync("input.txt").toString()
exports.sample = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
const rawcrates = exports.sample.split("\n\n")[0];
const rawinstructions = exports.sample.split("\n\n")[1].split("\n");
function deconstruct(rawstring) {
    const rawdata = rawstring.split("\n").slice(0, -1).reverse().map(container => {
        return container.replaceAll("   ", "$").replaceAll("[", "").replaceAll("]", "").replaceAll(" ", "");
    });
    const data = [];
    rawdata.forEach((_, index) => {
        rawdata.forEach((container) => {
            if (data[index] == null)
                data.push([]);
            if (container.charAt(index) === "$")
                return;
            data[index].push(container.charAt(index));
        });
    });
    return data.reverse();
}
const deconstructedCrates = deconstruct(rawcrates);
const instructions = parseinstruction(rawinstructions);
function movecrate(instructions, crates) {
    return instructions.map((instruction) => {
        var _a, _b, _c;
        for (let index = 0; index < parseInt((_a = instruction.at(1)) !== null && _a !== void 0 ? _a : "0"); index++) {
            const from = parseInt((_b = instruction.at(2)) !== null && _b !== void 0 ? _b : "0");
            const to = parseInt((_c = instruction.at(3)) !== null && _c !== void 0 ? _c : "0");
            console.log("crates", crates[from].pop(), to);
        }
        return crates;
    });
}
function parseinstruction(rawinstructions) {
    console.log(rawinstructions);
    return rawinstructions.map(instruction => {
        return instruction.replace("move ", "").replace(" from ", "").replace(" to ", "");
    });
}
console.log("Crates/instructions", [deconstructedCrates, instructions]);
console.log(movecrate(instructions, deconstructedCrates));
