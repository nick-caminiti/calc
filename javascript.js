const displayText = document.querySelector('#displayText')
const buttonArea = document.querySelector('#buttonArea')
let displayValue = ''
let num1 = null
let num2 = null
let operator = ''
let prevPressNum
let prevPessOperator

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
}

buttonArea.addEventListener('click', function (e) {
    const isClear = e.target.textContent === 'clear'
    if (isClear) {clear()}
})

buttonArea.addEventListener('click', function (e){
    // debugger
    const isButton = e.target.nodeName === 'BUTTON';
    const isNum = e.target.classList.contains('num');
    const isOperator = e.target.classList.contains('operator');
    
    if(isButton) {
        // debugger
        if(isNum) {
            if (!prevPressNum) {
                displayValue = ''
                displayValue += e.target.textContent
                displayText.textContent = displayValue
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
                displayValue = operate(operator, Number(num1), Number(num2))
                displayText.textContent = displayValue
                num1 = displayValue
            }
        }
        prevPressNum = isNum
        prevPessOperator = isOperator
        console.log(isOperator)
    }
})


