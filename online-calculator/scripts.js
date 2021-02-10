//General functions for operating on two numbers
const add = function(num1, num2){
    return num1 + num2;
}

const multiply = function(num1, num2){
    return num1*num2;
}

const subtract = function(num1, num2){
    return num1 - num2;
}

const divide = function(num1, num2){
    return num1/num2;
}

const power = function(num1, num2){
    return num1**num2;
}

const allOperations = [
    {operator: "+", operation: add, precedence: 3}, 
    {operator: "-", operation: subtract, precedence: 3}, 
    {operator: "/", operation: divide, precedence: 2}, 
    {operator: "x", operation: multiply, precedence: 2}, 
    {operator: "^", operation: power, precedence: 1},
]

maxPrecedence = allOperations.reduce((prevValue, currValue) => currValue.precedence > prevValue.precdence ? currValue : prevValue).precedence;

//General function to do any of the operations
function operate(num1, num2, operator){
    let chosenOperation = allOperations.find(element => element.operator == operator);
    return chosenOperation.operation(num1, num2);

}






//Main Program

//DOM elements
const displayContainer = document.querySelector('#display-text');
const resetButton = document.querySelector('#reset-button');
const calculatorButtons = Array.from(document.querySelectorAll('[data-key]'));

//Regex
const operatorReg = /^[\+\-/x\^]$/;
const numberReg = /([[\+|\-]*[\d || \.]+|(?:-?Infinity))/;
const magnitudeReg = /(?:[\d || \.]+|(?:Infinity))/;

//Stores value to be displayed on screen
let displayValue = '';

function getCorrespondingOperation(inputtedKey){
    //Reassign different keyboard buttons to the operations
    uniqueRemapping = [
        //Remap enter
        {key: 'Enter', operation: '='},
        //Remap backspace
        {key: 'Backspace', operation: 'DEL'},
        //Remap asterik *
        {key: '*', operation: 'x'},
    ]
    const uniqueKeyOperation = uniqueRemapping.find(value => value.key == inputtedKey);
    return uniqueKeyOperation ? (uniqueKeyOperation.operation || String.fromCharCode(inputtedKey)) :  inputtedKey;
}

//Functions associated with the HTML and user interactibility
function addToScreen(value){
    displayValue += value;
    displayContainer.textContent = displayValue;
}

function deletePreviousInput(){
    displayValue = displayValue.substr(0, displayValue.length - 1);
}

function resetScreen(){
    displayContainer.textContent = '';
    displayValue = '';
}

function displayInputToScreen(text){
    if(displayValue.match('ERROR')){
        resetScreen();
    }
    if(text == '=') {
        //Evaluate the current equation and update the screen with the answer
        const equationAnswer = evaluateEntireEquation(displayValue);;
        resetScreen()
        addToScreen(equationAnswer);
    } else if (text == 'DEL'){
        //Delete last value and update screen
        deletePreviousInput();
        addToScreen('');
    } else {
        //If previous was not an operator allow any
        if(!operatorReg.test(displayValue.substr(-1)) || !(/[\x\^\/]/.test(text))){
            addToScreen(text);
        }        
    } 
}

function evaluateEntireEquation() {
    //ORDER OF ERROR DETECTION
    //Split equation using number detection(Accepts multiple decimals in a single number)
    //Evaluates signage in front of number
    //Use isNaN to evaluate if it has wrong decimals
    //Evaluates equation

    //Division by 0 or an empty equation is disallowed
    if(displayValue.length == 0){
        return 'ERROR NOTHING INPUTTED';
    }

    //Convert the string to an array split at the numbers
    let processedEquation = displayValue
                    .split(numberReg)
                    .filter(value => value != '')
    
    //Evaluate the positive or negative signs in front of numbers
    processedEquation = processedEquation.map(value => {
        //The current value is an operator between two numbers so dont do anything
        if(!numberReg.test(value)){
            return value;
        }
        
        //Evaluates if number is positive or negative
        let isNegative = (value.match(/\-/g) || []).length % 2 != 0;
        //Returns evaluated number with a positive or negative sign(only one)
        if(isNegative){
            return '-' + value.match(magnitudeReg)[0];
        } else {
            return value.match(magnitudeReg)[0];
        }
    });

    //Checks that every number is valid, catches incorrect decimals
    let hasInvalidDecimal = processedEquation.some(value => numberReg.test(value) ? isNaN(value) : false);
    
    //If there is an invalid decimal throw error
    if(hasInvalidDecimal){
        return 'INVALID DECIMAL ERROR';
    }

    //Convert all the numbers to the correct datatype since you are sure all numbers are actually numbers now
    processedEquation = processedEquation.map(value => isNaN(value) ? value : Number(value));
    
    //Add addition symbols between two consecutive numbers since we took their signs away
    processedEquation = processedEquation.flatMap((value, currIdx) => {
        if(currIdx + 1 < processedEquation.length){
            if(typeof(value) == 'number' && typeof(processedEquation[currIdx + 1]) == 'number'){
                return [value, '+'];
            }
        }

        return value;
    })

    //Since processed equation doesnt follow alternating form of numbers and operations, syntax error
    if(processedEquation.length % 2 == 0 || (processedEquation.length == 1 && typeof(processedEquation[0]) != 'number')){
        return 'OPERATIONS ERROR!';
    }

    //Evaluate expressions with highest precedence first then to lowest(BEDMAS)
    for(let i = 1; i<=maxPrecedence; i++){
        for(let idx = 0; idx < processedEquation.length; idx++){

            //Check if the current element is an operator and if we are evaluating operators with that precedence currently
            if(allOperations.some(value => value.operator == processedEquation[idx] && value.precedence == i)){
                //Catches any division by 0
                if(processedEquation[idx] == '/' && Math.abs(processedEquation[idx+1]) == 0){
                    return 'DIVISION BY ZERO ERROR';
                }

                let evaluatedSection = operate(processedEquation[idx-1], processedEquation[idx+1], processedEquation[idx]);
                processedEquation.splice(idx-1, 3, evaluatedSection);

                //Since we deleted one element before the operator, we need to move idx back one so that the element at the next idx will be the element at next idx if we had not deleted anything
                idx-=1;
            }
        }
    }

    //The equation is now reduced to a singular number
    return processedEquation[0];
}

//Makes the calculators buttons actually work
calculatorButtons.forEach(button => button.addEventListener('click', function(event) {
    const buttonPressedText = this.getAttribute('data-key');
    displayInputToScreen(buttonPressedText);
}));

resetButton.addEventListener('click', resetScreen);

//Keyboard input
document.addEventListener('keydown', event => {
    const matchingButton = calculatorButtons.find(button => button.getAttribute('data-key') == getCorrespondingOperation(event.key));
    if(matchingButton){
        displayInputToScreen(matchingButton.getAttribute('data-key'));
    }
})

