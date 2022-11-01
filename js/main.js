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


function calculatorOperations(text = "") {

    let operation = 0;
    let numbersValidator = /([-]?[0-9]+[\.]?[0-9]*)/ig;
    let operatorValidator = /[asmd]/ig;
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

    operation = arrayNumbers[0];
    counter = 0;
    for (let index = 1; index < arrayNumbers.length; index++) {

        switch (arrayOperator[counter]) {
            case "a":
                operation += arrayNumbers[index];
                break;
            case "s":
                operation -= arrayNumbers[index];
                break;
            case "m":
                operation *= arrayNumbers[index];
                break;
            case "d":
                operation /= arrayNumbers[index];
                break;
            default:
                console.error("error");
                break;
        }

        counter++;
    }

    if (typeof arrayNumbers[0] !== "undefined") {
        $screenPrimary.textContent = operation;
    } else {
        $screenPrimary.textContent = text;
    }
}

function swapValues(value) {

    let character = value;

    switch (character) {
        case "+":
            character = "a";
            break;
        case "-":
            //First verification
            if (!((text[text.length - 1] === "d" |
                text[text.length - 1] === "m") &&
                character === "-")) {
                //Second verification
                if (!(text.length === 0)) {
                    character = "s";
                }
            }
            break;
        case "*":
            character = "m";
            break;
        case "/":
            character = "d";
            break;
        case "x":
            character = "m";
            break;
        case "del":
            character = "Backspace"
            break;
        default:
            console.log("Other");
            break;
    }

    return character;
}

function replaceValues(text = "") {
    let textFinal = text;
    ["a", "s", "m", "d"].forEach(el => {
        switch (el) {
            case "a":
                textFinal = textFinal.replaceAll("a", "+");
                break;
            case "s":
                textFinal = textFinal.replaceAll("s", "-");
                break;
            case "m":
                textFinal = textFinal.replaceAll("m", "x");
                break;
            case "d":
                textFinal = textFinal.replaceAll("d", "/");
                break;
            default:
                console.error(error);
                break;
        }
    });
    return textFinal;
}

function filterString(value) {
    let array1;
    let filteredText = "";
    let firstNumberNegative = false;
    let validatorText = /([0-9]+[\.]?[0-9]*)[asmd]?((?<=d|m)-)?/ig;

    let character = swapValues(value);

    $screenPrimary.style.setProperty('font-size', '2.5rem');

    if (character === "reset") {
        $screenPrimary.textContent = "0";
        $screenSecondary.textContent = "";
        text = "";
    }
    if (character === "Enter" | character === "=") {
        $screenPrimary.style.setProperty('font-size', '2.8rem');
        text = $screenPrimary.textContent;
        $screenSecondary.textContent = "";
        return;
    }
    if (character === "Backspace" && text.length >= 1) {
        text = text.substring(0, text.length - 1);
    }
    if ((/[asmd]/ig.test(text[text.length - 1]) &&
        /[asmd]/ig.test(character))) {

        if (!((text[text.length - 1] === "d" |
            text[text.length - 1] === "m") &&
            character === "-")) {
            text = text.substring(0, text.length - 1) + character;
        }
    }

    text += character;

    if (text[0] === "-") firstNumberNegative = true;

    while ((array1 = validatorText.exec(text)) !== null) {
        filteredText += array1[0];
    }

    text = firstNumberNegative ? "-" + filteredText : filteredText;
    calculatorOperations(text);
    $screenSecondary.textContent = replaceValues(text);
}


function defaultTheme() {
    let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return dark;
}

function saveThemeLocalStorage(value) {
    localStorage.setItem("theme", value);
}

function moveSelector(value) {
    switch (value) {
        case 1:
            $selector.style.setProperty('Left', "8%");
            break;
        case 2:
            $selector.style.setProperty('Left', "40%");
            break;
        case 3:
            $selector.style.setProperty('Left', "70%");
            break;

        default:
            break;
    }
}

document.addEventListener("keyup", (e) => {

    let character = e.key;
    filterString(character)

});

document.addEventListener('click', (e) => {

    $buttonClass = buttons.includes(e.target.classList[1]);


    if (e.target.matches('.option-1')) {
        moveSelector(1);
        option = 1;
        theme.initializeColors(option);
        saveThemeLocalStorage(option);
    }
    if (e.target.matches('.option-2')) {
        moveSelector(2);
        option = 2;
        theme.initializeColors(option)
        saveThemeLocalStorage(option);
    }
    if (e.target.matches('.option-3')) {
        moveSelector(3);
        option = 3;
        theme.initializeColors(option)
        saveThemeLocalStorage(option);
    }
    if ($buttonClass) {
        let character = e.target.textContent.trim();
        filterString(character);
    }

})

document.addEventListener("DOMContentLoaded", (e) => {

    let themeOption = localStorage.getItem("theme");
    
    if (themeOption !== null) {
        theme.initializeColors(parseInt(themeOption));
        moveSelector(parseInt(themeOption));
    } else {
        if (defaultTheme()) {
            theme.initializeColors(1);
        } {
            theme.initializeColors(2);
            moveSelector(2);
        }
    }

})