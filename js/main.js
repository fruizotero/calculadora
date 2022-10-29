
const $result = document.querySelector(".box span:nth-child(2)");

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
        $result.textContent = operation;
    } else {
        $result.textContent = 0;
    }
}



let text = "";
let validatorText = /([0-9]+[\.]?[0-9]*)[+*/-]?/ig;
const $boxSpan = document.querySelector(".box span");

document.addEventListener("keyup", (e) => {

    let array1;
    let filteredText = "";
    let keyCharacter = e.key;
    let negativeNumber = false;


    console.log("key", keyCharacter);

    if (keyCharacter === "Backspace" && text.length >= 1) {
        text = text.substring(0, text.length - 1);
    }
    //TODO::Por si falla solo se modificó esto => [\.+*/-]
    if ((/[+*/-]/ig.test(text[text.length - 1]) &&
        /[+*/-]/ig.test(keyCharacter))) {
        text = text.substring(0, text.length - 1) + keyCharacter;
    }

    text += keyCharacter;

    if (text[0] === "-") negativeNumber = true;

    while ((array1 = validatorText.exec(text)) !== null) {
        filteredText += array1[0];
    }

    console.log(text);
    text = negativeNumber ? "-" + filteredText : filteredText;
    calculatorOperations(text, negativeNumber);
    $boxSpan.textContent = text;

})

