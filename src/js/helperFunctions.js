/* export default function helloHelper(param){
    console.log('Hello ', param, ' from the helperFunctions')
}*/

function helloHelper(param) {
    console.log('Hello', param, 'via helloHelper() in helperFunctions.js')
}

function diceRollHelper() {
    let result = Math.floor(Math.random() * 6 + 1);
    console.log('vanilla rolled: ', result)
    return result;
}

export { helloHelper, diceRollHelper };