const readInputFile = require("../readInput");

/* 
   Day 1 
   Get the very first and very last number
   Form a two-digit number
   Sum all lines from input, folowing above rule
*/

const calibrationValues = readInputFile("Day 1");

console.time("Day 1 - Part 1");
let sum = 0;
calibrationValues.forEach(
   value => {
      const digits = value.match(/\d/g);
      const digit1 = digits[0];
      const digit2 = digits[digits.length - 1];
      const calibrationVal = digit1 + digit2;
      sum += Number.parseInt(calibrationVal);
   }
);

console.log(`Day 1 - P - Result is ${sum}`);
console.timeEnd("Day 1 - Part 1");

/*
   Day 1 - Part 2
   Need to consider the spelled out numbers now (eg: one = 1, two = 2)
*/

console.time("Day 1 - Part 2");
sum = 0;
const numbers = ["\\d","one","two","three","four","five","six","seven","eight","nine"];

const getDigits = value => {
   let digits = [];   
   numbers.forEach(element => {
      const expr = new RegExp(element, "g");
      digits = [...digits, ...value.matchAll(expr)];
   });
   return digits.sort((a, b) => a.index - b.index);
}

calibrationValues.forEach(
   value => {
      const digits = getDigits(value);
      const n1 = numbers.indexOf(digits[0][0]);
      const digit1 = (n1 >= 1) ? n1.toString() : digits[0][0];
      const n2 = numbers.indexOf(digits[digits.length - 1][0]);
      const digit2 = (n2 >= 0) ? n2.toString() : digits[digits.length - 1][0];
      const calibrationVal = digit1 + digit2;
      sum += Number.parseInt(calibrationVal);
   }
);

console.log(`Day 1 - Part 2 - Result is ${sum}`);
console.timeEnd("Day 1 - Part 2");