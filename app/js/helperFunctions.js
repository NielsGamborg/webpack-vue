function helloHelper(param) {
    console.log('Hello', param, 'via helloHelper() in helperFunctions.js')
}

function diceRollHelper() {
    let result = Math.floor(Math.random() * 6 + 1);
    return result;
}

export { helloHelper, diceRollHelper };