const readInputFile = require("../readInput");

const games = readInputFile("Day 2");

/*
    Day 2 - Part 1    
*/

console.time("Day 2 - Part 1");
const MAX_REDS = 12;
const MAX_GREENS = 13;
const MAX_BLUES = 14;

const getReds = game => {
    return game.match(/\d+\sred/g).map(cubes => Number.parseInt(cubes.replace(" red", "")));
}
const getGreens = game => {
    return game.match(/\d+\sgreen/g).map(cubes => Number.parseInt(cubes.replace(" green", "")));
}
const getBlues = game => {
    return game.match(/\d+\sblue/g).map(cubes => Number.parseInt(cubes.replace(" blue", "")));
}

let sum = 0;
games.forEach((game, i) => {
    const reds = getReds(game);
    const greens = getGreens(game);
    const blues = getBlues(game);

    const totalReds = Math.max(...reds);
    const totalGreens = Math.max(...greens);
    const totalBlues = Math.max(...blues);

    if (totalReds <= MAX_REDS && totalGreens <= MAX_GREENS && totalBlues <= MAX_BLUES)
        sum += i + 1;
});

console.log(`Day 2 - Part 1 - Result is ${sum}`);
console.timeEnd("Day 2 - Part 1");