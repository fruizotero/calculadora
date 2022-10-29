
const $result = document.querySelector(".box span:nth-child(2)");

function calculatorOperations(text = "") {

    let operation = 0;
    let numbersValidator = /([0-9]+[\.]?[0-9]*)/ig;
    let operatorValidator = /[+*/-]/ig;
    let arrayNumbers = [];
    let arrayOperator = [];
    let arrayAux1;
    let arrayAux2;
    let counter;



    while ((arrayAux1 = numbersValidator.exec(text)) !== null) {
        arrayNumbers.push(parseInt(arrayAux1[0]))
    }

    while ((arrayAux2 = operatorValidator.exec(text)) !== null) {
        arrayOperator.push(arrayAux2[0])
    }

    // console.clear();
    // console.log(arrayNumbers);
    // console.log(arrayOperator);
    operation = arrayNumbers[0];
    counter = 0;

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

    $result.textContent = operation;
}



let text = "";
let validatorText = /([0-9]+[\.]?[0-9]*)[+*/-]?/ig;
const $boxSpan = document.querySelector(".box span");

document.addEventListener("keyup", (e) => {

    let array1;
    let filteredText = "";
    let keyCharacter = e.key;

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

    while ((array1 = validatorText.exec(text)) !== null) {
        filteredText += array1[0];
    }

    text = filteredText;
    console.log(text);
    calculatorOperations(text);
    $boxSpan.textContent = text;

})

