const displayText = document.querySelector('#displayText')
const buttonArea = document.querySelector('#calc')
const nice = document.getElementById('#nice')
let displayValue = ''
let num1 = null
let num2 = null
let operator = ''
let prevPressNum
let prevPessOperator
let nICEMODE
let niceToggle = 0

function add (a,b) {
    return a + b
}

function subtract (a,b) {
    return a - b
}

function multiply (a,b) {
    return a * b
}

function divide (a,b) {
    return a / b
}

// should try to figure out how to do this better
function operate (oper, a, b) {
    if (oper == "+") {
        return add(a,b)
    } else if (oper == "-") {
        return subtract(a,b)
    } else if (oper == "*") {
        return multiply(a,b)
    } else if (oper == "/") {
        return divide(a,b)
    }
}

// buttonArea.addEventListener('click', function (e){
//     console.log(e.target.textContent)
// })

function clear() {
    displayValue = 0
    displayText.textContent = displayValue
    num1 = ''
    num2 = ''
    operator = ''
    nICEMODE = ''
    document.getElementById('nice').classList.remove("niceEngaged")
}

buttonArea.addEventListener('click', function (e) {
    const isClear = e.target.textContent === 'AC'
    if (isClear) {clear()}
    
})

buttonArea.addEventListener('click', function (e){
    // debugger
    const isButton = e.target.nodeName === 'BUTTON';
    const isNum = e.target.classList.contains('num');
    const isOperator = e.target.classList.contains('operator');
    const isNegative = e.target.id === 'negative'
    const isPercent = e.target.id === 'percent'
    const isNice = e.target.id === 'nice'

    if (isNice) {
        nICEMODE = true
        displayValue = 0
        displayText.textContent = displayValue
    }
    
    if (isNegative) {displayValue = Number(displayValue) * -1}
    if (isPercent) {displayValue = Number(displayValue) / 100}
    displayText.textContent = displayValue

    if(isButton) {
        // debugger
        if(isNum) {
            if (!prevPressNum) {
                displayValue = ''
                displayValue += e.target.textContent
                displayText.textContent = displayValue
            } else if (e.target.id == "decimal" && displayValue.includes(".")) {
                // do nothing
            } else {
                displayValue += e.target.textContent
                displayText.textContent = displayValue
            }
        } else if (isOperator) {
            if (!num1) {
                num1 = displayValue
                operator = e.target.textContent
            } else if (prevPessOperator) {
                operator = e.target.textContent
            } else {
                num2 = displayValue
                if (nICEMODE) {
                    if (niceToggle == 0) {
                        displayText.textContent = "69"
                        num1 = displayValue
                        niceToggle = 1
                    } else {
                        displayText.textContent = "420"
                        num1 = displayValue
                        niceToggle = 0
                    }
                } else {
                    // /////////////////////////////////////////////////// //
                    // behavior of pressing operator multiple times is off //
                    // /////////////////////////////////////////////////// //
                    displayValue = operate(operator, Number(num1), Number(num2))
                    num1 = displayValue
                    // debugger
                    //round after storing value                    
                    // let numArray = displayValue.toString().split('.')
                    // let wholeNums = numArray[0].length
                    // if (numArray[1]) {
                    //     let decimals = numArray[1].length
                    // }  
                    // console.log(numArray)
                    // if (displayValue.toString().length > 10) {
                    //     if (wholeNums > 10) {
                    //         let divideNum = Math.pow(.1, (wholeNums))
                    //         displayValue /= divideNum
                    //         console.log(displayValue)
                    //         displayValue += `E${wholeNums -1}`
                    //         console.log(displayValue)
                    //     } else {

                    //     }
                    // }                     
                    displayText.textContent = displayValue
                    
                }
            }
        }
        prevPressNum = isNum
        prevPessOperator = isOperator
    }

    // STYLES //

    if(isNice) {
        document.getElementById('nice').classList.add("niceEngaged")
    }

    const operators = document.querySelectorAll('.operatorEngaged');

    operators.forEach(operator => {
        operator.classList.remove('operatorEngaged');
    })

    if (isOperator) {
        document.getElementById(e.target.id).classList.add("operatorEngaged")
    }


})


