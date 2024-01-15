const readInputFile = require("../readInput");

const engineSchematic = readInputFile("Day 3");

// set the "borders" of schematic to .
engineSchematic.forEach((schema, i, arr) => arr[i] = `.${schema}.`);
const len = engineSchematic[0].length;
engineSchematic.unshift(".".repeat(len));
engineSchematic.push(".".repeat(len));

/*
    Day 3 - Part 1
 */
const solvePart1 = () => {
    let sum = 0;
    for (let i = 1; i < engineSchematic.length - 1; i++) {
        let partNumber = "";
        let isPartNumber = false;
        for (let j = 1; j < engineSchematic[i].length - 1; j++) {
            if (Number.isNaN(Number.parseInt(engineSchematic[i][j])))
                continue;

            partNumber += engineSchematic[i][j];
            const moreDigit = !Number.isNaN(Number.parseInt(engineSchematic[i][j + 1]));

            if (!isPartNumber) {
                isPartNumber = (
                    (Number.isNaN(Number.parseInt(engineSchematic[i][j + 1])) && engineSchematic[i][j + 1] !== ".") ||
                    (Number.isNaN(Number.parseInt(engineSchematic[i][j - 1])) && engineSchematic[i][j - 1] !== ".") ||
                    (Number.isNaN(Number.parseInt(engineSchematic[i + 1][j + 1])) && engineSchematic[i + 1][j + 1] !== ".") ||
                    (Number.isNaN(Number.parseInt(engineSchematic[i - 1][j + 1])) && engineSchematic[i - 1][j + 1] !== ".") ||
                    (Number.isNaN(Number.parseInt(engineSchematic[i + 1][j - 1])) && engineSchematic[i + 1][j - 1] !== ".") ||
                    (Number.isNaN(Number.parseInt(engineSchematic[i - 1][j - 1])) && engineSchematic[i - 1][j - 1] !== ".") ||
                    (Number.isNaN(Number.parseInt(engineSchematic[i + 1][j])) && engineSchematic[i + 1][j] !== ".") ||
                    (Number.isNaN(Number.parseInt(engineSchematic[i - 1][j])) && engineSchematic[i - 1][j] !== ".")
                );
            }

            if (!moreDigit && isPartNumber) {
                sum += Number.parseInt(partNumber);
                partNumber = "";
                isPartNumber = false;
            } else if (!moreDigit) {
                partNumber = "";
            }
        }
    }
    return sum;
}

console.time("Day 3 - Part 1");
console.log(`Day 3 - Part 1 - Result is ${solvePart1()}`);
console.timeEnd("Day 3 - Part 1");

/*
    Day 3 - Part 2
 */

const solvePart2 = () => {
    let sum = 0;
    let gears = [];
    for (let i = 1; i < engineSchematic.length - 1; i++) {
        for (let j = 1; j < engineSchematic[i].length - 1; j++) {
            if (engineSchematic[i][j] !== "*")
                continue;
            gears.push([i, j]);
        }
    }

    const isNumber = s => {
        for (let i = 0; i < s.length; i++)
            if (Number.isNaN(s[i]) || s[i] === ".")
                return false;
        return true;
    }

    gears.forEach(gear => {
        // see if there's as number immediately at the sides
        const up = engineSchematic[gear[0] - 1].substring(gear[1] - 1, gear[1] + 2);
        const down = engineSchematic[gear[0] + 1].substring(gear[1] - 1, gear[1] + 2);
        const left = engineSchematic[gear[0]][gear[1] - 1];
        const right = engineSchematic[gear[0]][gear[1] + 1];

        const above = ((up.startsWith(".") || up.endsWith(".")) && (up !== "...")) || (isNumber(up));
        const below = ((down.startsWith(".") || down.endsWith(".")) && (down !== "...")) || (isNumber(down));
        const twoAbove = (up.indexOf(".") > 0 && up.lastIndexOf(".") < 2);
        const twoBelow = (down.indexOf(".") > 0 && down.lastIndexOf(".") < 2);
        const leftSide = !Number.isNaN(Number.parseInt(left));
        const rightSide = !Number.isNaN(Number.parseInt(right));
        let allDigits = [above, below, leftSide, rightSide].filter(hasNumber => hasNumber).length;
        allDigits += (twoAbove ? 2 : 0) + (twoBelow ? 2 : 0);
        if (allDigits !== 2)
            return; // needs to have exactly 2 numbers adjacent to a * symbol

        let digit1 = "";
        let digit2 = "";
        if (twoAbove) {
            digit1 = engineSchematic[gear[0] - 1].substring(0, gear[1]).match(/\d+/g).pop();
            digit2 = engineSchematic[gear[0] - 1].substring(gear[1] + 1).match(/\d+/g).shift();
            sum += Number.parseInt(digit1) * Number.parseInt(digit2);
            return;
        }
        if (twoBelow) {
            digit1 = engineSchematic[gear[0] + 1].substring(0, gear[1]).match(/\d+/g).pop();
            digit2 = engineSchematic[gear[0] + 1].substring(gear[1] + 1).match(/\d+/g).shift();
            sum += Number.parseInt(digit1) * Number.parseInt(digit2);
            return;
        }
        const lastIdxUp = engineSchematic[gear[0] - 1].indexOf(".", gear[1] + 1);
        const lastIdxDwn = engineSchematic[gear[0] + 1].indexOf(".", gear[1] + 1);
        if (above) {
            if (up.startsWith("."))
                digit1 = engineSchematic[gear[0] - 1].substring(gear[1]).match(/\d+/g).shift();
            else
                digit1 = engineSchematic[gear[0] - 1].substring(0, lastIdxUp).match(/\d+/g).pop();
        }
        if (below) {
            if (digit1 === "") {
                if (down.startsWith("."))
                    digit1 = engineSchematic[gear[0] + 1].substring(gear[1]).match(/\d+/g).shift();
                else
                    digit1 = engineSchematic[gear[0] + 1].substring(0, lastIdxDwn).match(/\d+/g).pop();
            } else {
                if (down.startsWith("."))
                    digit2 = engineSchematic[gear[0] + 1].substring(gear[1]).match(/\d+/g).shift();
                else
                    digit2 = engineSchematic[gear[0] + 1].substring(0, lastIdxDwn).match(/\d+/g).pop();
            }
        }
        if (leftSide) {
            if (digit1 === "")
                digit1 = engineSchematic[gear[0]].substring(0, gear[1]).match(/\d+/g).pop();
            else
                digit2 = engineSchematic[gear[0]].substring(0, gear[1]).match(/\d+/g).pop();
        }
        if (rightSide) {
            if (digit1 === "")
                digit1 = engineSchematic[gear[0]].substring(gear[1] + 1).match(/\d+/g).shift();
            else
                digit2 = engineSchematic[gear[0]].substring(gear[1] + 1).match(/\d+/g).shift();
        }
        digit1 = digit1.replace(".", "");
        digit2 = digit2.replace(".", "");
        sum += Number.parseInt(digit1) * Number.parseInt(digit2);
    });
    return sum;
}

console.time("Day 3 - Part 2");
console.log(`Day 3 - Part 2 - Result is ${solvePart2()}`);
console.timeEnd("Day 3 - Part 2");