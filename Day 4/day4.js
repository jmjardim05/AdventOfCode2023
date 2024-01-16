const readInputFile = require("../readInput")
const scratchCardsInput = readInputFile("Day 4")

/*
    Day 4 - Part 1
 */

const scratchCards = scratchCardsInput.map(card => card.substring(card.indexOf(":") + 1))
const getNumbers = numberList => {
    let n = "";
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let list = [];
    for (let i = 0; i < numberList.length; i++) {
        if (digits.indexOf(numberList[i]) >= 0)
            n += numberList[i]
        else if (n !== "") {
            list.push(n)
            n = ""
        }
    }
    if (n != "")
        list.push(n)
    return list
}

const solvePart1 = () => {
    let sum = 0
    scratchCards.forEach(card => {
        const lists = card.split("|");
        const winningNumbers = getNumbers(lists[0])
        const yourNumbers = getNumbers(lists[1])

        const worthPoints = yourNumbers.filter(number => winningNumbers.includes(number)).length
        let points = 0
        if (worthPoints > 0) {
            points = 1
            for (let i = 2; i <= worthPoints; i++) {
                points = points * 2
            }
        }
        sum += points
    })
    return sum
}

console.time("Day 4 - Part 1")
console.log(`Day 4 - Part 1 - Result is ${solvePart1()}`)
console.timeEnd("Day 4 - Part 1")

/*
    Day 4 - Part 2
*/
let sum = 0;
const solvePart2 = (cardIndex, copies) => {
    let copiesProcessed = 0;
    scratchCards.forEach((card, thisCard) => {
        if (cardIndex > thisCard)
            return

        const lists = card.split("|");
        const winningNumbers = getNumbers(lists[0])
        const yourNumbers = getNumbers(lists[1])

        const copiesWon = yourNumbers.filter(number => winningNumbers.includes(number)).length
        sum++
        copiesProcessed++
        if (copiesWon === 0 || copiesProcessed === copies)
            cardIndex = scratchCards.length                
        if (copiesProcessed === copies)
            return        
        solvePart2(thisCard + 1, copiesWon)        
    })
    return sum
}

console.time("Day 4 - Part 2")
console.log(solvePart2(0, 6))
console.timeEnd("Day 4 - Part 2")