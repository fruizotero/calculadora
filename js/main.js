import { Theme } from './theme.js';


const $screenSecondary = document.querySelector(".screen__secondary-text");
const $screenPrimary = document.querySelector(".screen__primary-text");
const $selector = document.querySelector('.theme__option--selector');
let $buttonClass;
let theme = new Theme();
let option = 1;
let text = "";
const buttons = [
    'key__1', 'key__2', 'key__3', 'key__4',
    'key__5', 'key__6', 'key__7', 'key__8',
    'key__9', 'key__10', 'key__11', 'key__12',
    'key__13', 'key__14', 'key__15', 'key__16',
    'key__17', 'key__18']


function calculatorOperations(text = "", negativeNumber = false) {

    let operation = 0;
    let numbersValidator = /([0-9]+[\.]?[0-9]*)/ig;
    let operatorValidator = /[+*/-]/ig;
    let arrayNumbers = [];
    let arrayOperator = [];
    let arrayAux1;
    let arrayAux2;
    let counter;


    while ((arrayAux1 = numbersValidator.exec(text)) !== null) {
        arrayNumbers.push(parseFloat(arrayAux1[0]))
    }

    while ((arrayAux2 = operatorValidator.exec(text)) !== null) {
        arrayOperator.push(arrayAux2[0])
    }

    operation = negativeNumber ? -arrayNumbers[0] : arrayNumbers[0];
    counter = negativeNumber ? 1 : 0;

    for (let index = 1; index < arrayNumbers.length; index++) {

        switch (arrayOperator[counter]) {
            case "+":
                operation += arrayNumbers[index];
                break;
            case "-":
                operation -= arrayNumbers[index];
                break;
            case "*":
                operation *= arrayNumbers[index];
                break;
            case "/":
                operation /= arrayNumbers[index];
                break;

            default:
                console.error("error");
                break;
        }

        counter++;
    }

    if (typeof arrayNumbers[0] !== "undefined") {
        $screenSecondary.textContent = operation;
    } else {
        $screenSecondary.textContent = 0;
    }
}


function filterString(character) {
    let array1;
    let filteredText = "";
    let negativeNumber = false;
    let validatorText = /([0-9]+[\.]?[0-9]*)[+*/-]?/ig;

    $screenPrimary.style.setProperty('font-size', '2.5rem');

    console.log("key", character);
    if (character === "reset") {
        $screenPrimary.textContent = "0";
        $screenSecondary.textContent = "";
        text = "";
    }
    if (character === "Enter" | character === "=") {
        $screenPrimary.style.setProperty('font-size', '2.8rem');
        $screenPrimary.textContent = $screenSecondary.textContent;
        text = $screenSecondary.textContent;
        $screenSecondary.textContent = "";
        return;
    }
    if (character === "del") {
        character = "Backspace"
    }
    if (character === "x") {
        character = "*";
    }
    if (character === "Backspace" && text.length >= 1) {
        text = text.substring(0, text.length - 1);
    }
    if ((/[+*/-]/ig.test(text[text.length - 1]) &&
        /[+*/-]/ig.test(character))) {
        text = text.substring(0, text.length - 1) + character;
    }

    text += character;

    if (text[0] === "-") negativeNumber = true;

    while ((array1 = validatorText.exec(text)) !== null) {
        filteredText += array1[0];
    }

    text = negativeNumber ? "-" + filteredText : filteredText;
    calculatorOperations(text, negativeNumber);
    $screenPrimary.textContent = text.replace('*', 'x');
}

document.addEventListener("keyup", (e) => {

    let character = e.key;
    filterString(character)

});



document.addEventListener('click', (e) => {

    $buttonClass = buttons.includes(e.target.classList[1]);


    if (e.target.matches('.option-1')) {
        $selector.style.setProperty('Left', '8%');
        option = 1;
        theme.initializeColors(option)
    }
    if (e.target.matches('.option-2')) {
        $selector.style.setProperty('Left', '40%');
        option = 2;
        theme.initializeColors(option)
    }
    if (e.target.matches('.option-3')) {
        $selector.style.setProperty('Left', '70%');
        option = 3;
        theme.initializeColors(option)
    }
    if ($buttonClass) {
        let selector = e.target.classList[1];
        // console.log(selector);
        // let $text = document.querySelector(`.${selector}--character`).textContent.trim();
        let character = e.target.textContent.trim();
        filterString(character);
    }

})