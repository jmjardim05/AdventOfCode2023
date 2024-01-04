const readInputFile = require("../readInput");

/* 
   Day 1 
   Get the very first and very last number
   Form a two-digit number
   Sum all lines from input, folowing above rule
*/

const calibrationValues = readInputFile("Day 1");

console.time("Day 1");
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

console.log(`Day 1 - Result is ${sum}`);
console.timeEnd("Day 1");