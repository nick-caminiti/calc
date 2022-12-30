const display = document.querySelector('#display')
const buttonArea = document.querySelector('#buttonArea')
let displayValue = ''
let num1 = null
let num2 = null
let operator = ''
let prevPressNum
let prevPressEquals

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
    if (oper == "add") {
        return add(a,b)
    } else if (oper == "subtract") {
        return subtract(a,b)
    } else if (oper == "multiply") {
        return multiply(a,b)
    } else if (oper == "divide") {
        return divide(a,b)
    }
}

// buttonArea.addEventListener('click', function (e){
//     console.log(e.target.classname)
// })

function clear() {
    displayValue = 0
    display.textContent = displayValue
    num1 = ''
    num2 = ''
    operator = ''
}

buttonArea.addEventListener('click', function (e) {
    const isClear = e.target.id === 'clear'
    if (isClear) {clear()}
})

buttonArea.addEventListener('click', function (e){
    // debugger
    const isButton = e.target.nodeName === 'BUTTON';
    const isNum = e.target.classList.contains('num');
    const isOperator = e.target.classList.contains('operator');
    const isEquals = e.target.id === 'equals'
    
    if (prevPressEquals) { clear()}
    
    if(isButton) {
        if(isNum) {
            if (!prevPressNum) {
                displayValue = ''
                displayValue += e.target.id
                display.textContent = displayValue
            } else {
                displayValue += e.target.id
                display.textContent = displayValue
            }
        } else if (isOperator) {
            if (!num1) {
                num1 = displayValue
                operator = e.target.id
            } else {
                // if operator pressed twice, replace
                num2 = displayValue
                displayValue = operate(operator, Number(num1), Number(num2))
                display.textContent = displayValue
            }
        }
        prevPressNum = isNum
        prevPressEquals = isEquals
        // console.log(prevPressEquals)
    }
})


