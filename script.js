const operators = ['+','-','*','/','%'];

//Basic Operations
function addition(a, b) {
    return a + b;
}

function subtraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}

function percentage(a) {
    return a * 0.01;
}

function minus(a) {
    return -a ;
}

//Setting all variables to 0 before using them
let inputNum = '';
let secondNum = '';
let inputSign = '';
let result = '';

const displayInput = document.querySelector('.input'); //imports display's input side
const displayOutput = document.querySelector('.output'); //imports display's answer side
const operationsArray = document.querySelectorAll('.operations'); //imports all signs (except pound sign)
const numberArray = document.querySelectorAll('.number'); //imports numpad
const equals = document.querySelector('.equals');

displayOutput.textContent = 0;

//Get first number of the equation
const getFirstNum = function() {
    numberArray.forEach(function(number) {
        number.addEventListener('click', function() {
            if (result && !inputSign) {
                inputNum = '';
                result = '';
                displayOutput.textContent = 0;
            }
            if (!inputSign) {
                inputNum += `${number.textContent}`;
                if (inputNum.length > 11) {
                    inputNum = inputNum.substring(0, 11);
                }
                displayInput.textContent = parseFloat(inputNum);
            }
        });
    });
};

//Get a sign of equation
const getSign = function() {
    operationsArray.forEach(function(operation) {
        operation.addEventListener('click', function() {
            if (inputNum && !secondNum) {
                inputSign = operation.textContent;
            } else if (inputNum && secondNum) {
                operate();
                inputSign = operation.textContent;
            }
        });
    });
}

//Get second number of the equation
const getSecondNum = function() {
    numberArray.forEach(function(number) {
        number.addEventListener('click', function() {
            if (inputSign) {
                secondNum += `${number.textContent}`;
                if (secondNum.length > 11) {
                    secondNum = secondNum.substring(0, 11);
                }
                displayInput.textContent = parseFloat(secondNum);
            }
        })
    });
}

//Solves the equation
function operate() {
    if (!secondNum) {
        secondNum = inputNum;
    };
    switch (inputSign) {
        case '+':
            result = addition(parseFloat(inputNum), parseFloat(secondNum));
            break;
        case '-':
            result = subtraction(parseFloat(inputNum), parseFloat(secondNum));
            break;
        case '*':
            result = multiplication(parseFloat(inputNum), parseFloat(secondNum));
            break;
        case '/':
            if (parseFloat(secondNum) === 0) {
                result = 'lol what?';
                break;
            } else {
            result = division(parseFloat(inputNum), parseFloat(secondNum));
            break;
            }
        default:
            result = 'lol what?';
            break;
    }
    if (result.toString().length > 10) {
        result = result.toString().substring(0, 10);
    }
    displayOutput.textContent = result;

    secondNum = '';
    inputSign = '';
    inputNum = result;
};

//Listener for AC button
document.querySelector('.clean').addEventListener('click', function() {
    displayInput.textContent = '';
    displayOutput.textContent = 0;
    inputNum = '';
    secondNum = '';
    inputSign = '';
    result = '';
});

//Listener for the Equal (=) sign
equals.addEventListener('click', function() {
    if (inputNum && secondNum && inputSign) {
        operate();
    }
});

//Listener for the Per cent (%) sign
document.querySelector('.percent').addEventListener('click', function() {
    if ((displayOutput.textContent = '0') && (!secondNum)) {
        inputNum = parseFloat(inputNum) * 0.01;
        displayInput.textContent = inputNum.toString().substring(0,10);
        displayOutput.textContent = inputNum.toString().substring(0,10);
    } else if ((displayOutput.textContent = '0') && (secondNum)) {
        operate();
        inputNum = parseFloat(inputNum) * 0.01;
        displayInput.textContent = inputNum.toString().substring(0,10);
        displayOutput.textContent = inputNum.toString().substring(0,10);
    } else {
        result = parseFloat(result) * 0.01;
        inputNum = result;
        displayInput.textContent = inputNum.toString().substring(0,10);
        displayOutput.textContent = result.toString().substring(0,10);
    }
});

//Listener for Plus-Minus (+/-) sign
document.querySelector('.plus-minus').addEventListener('click', function() {
    if (!secondNum) {
        inputNum = 0 - parseFloat(inputNum);
        inputNum = inputNum.toString();
        displayInput.textContent = inputNum.toString().substring(0,10);
    } else if (secondNum) {
        // operate();
        secondNum = 0 - parseFloat(secondNum);
        secondNum = secondNum.toString();
        displayInput.textContent = secondNum.toString().substring(0,10);
    } else {
        result = 0 - parseFloat(result);
        inputNum = result.toString();
        displayInput.textContent = inputNum.toString().substring(0,10);
    }
});

//Listener for the Pound (.) button
document.querySelector('.pound').addEventListener('click', function() {
    if ((!secondNum) && (!inputSign) && (!result)) {
        if (!inputNum.toString().includes('.')) {
            inputNum = inputNum.toString() + '.';
            displayInput.textContent = inputNum.toString().substring(0,10);
        }
    } else if ((!secondNum) && (inputSign) && (inputNum) && (!result)) {
        if (!secondNum.toString().includes('.')) {
            secondNum = '0.';
            displayInput.textContent = secondNum.toString().substring(0,10);
        }
    } else if ((!secondNum) && (inputSign) && (inputNum)) {
        if (!secondNum.toString().includes('.')) {
            secondNum = '0.';
            displayInput.textContent = secondNum.toString().substring(0,10);
        }
    } else if ((inputSign) && (secondNum)) {
        if (!secondNum.toString().includes('.')) {
            secondNum = secondNum.toString() + '.';
            displayInput.textContent = secondNum.toString().substring(0,10);
        }
    } else {
        if (!inputNum.toString().includes('.')) {
            result = result.toString() + '.';
            inputNum = result;
            displayInput.textContent = inputNum.toString().substring(0,10);
            displayOutput.textContent = result.toString().substring(0,10);
        }
    }
})

//Keyboard listener for numbers and a backspace
document.addEventListener('keydown', function(event) {
    // Check if the key pressed is a number or a backspace
    let isNumber = (event.keyCode >= 48 && event.keyCode <= 57) || 
                   (event.keyCode >= 96 && event.keyCode <= 105);
    let backspace = event.keyCode == 8;

    if (!isNumber && !backspace) {
        event.preventDefault();  // Prevent any other characters from being entered
    } else {
        if (!inputSign) {
            if (isNumber) {
                inputNum += event.key.toString();
                displayInput.textContent = inputNum.substring(0, 11);
            } else if (backspace) {
                inputNum = inputNum.slice(0, -1);  // Remove the last digit
                displayInput.textContent = inputNum.substring(0, 11);
            }
        } else {
            if (isNumber) {
                secondNum += event.key.toString();
                displayInput.textContent = secondNum.substring(0, 11);
            } else if (backspace) {
                secondNum = secondNum.slice(0, -1);
                displayInput.textContent = secondNum.substring(0, 11);
            }
        }
    };
});

//Functions are called in the order below
getFirstNum();
getSign();
getSecondNum();