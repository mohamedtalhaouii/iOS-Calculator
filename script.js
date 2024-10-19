const $numOperations = [...document.querySelectorAll('.numbers, .operation')];
const $clearButton = document.querySelector('.clear');
const $calculateButton = document.querySelector('.equal');
const $signButton = document.querySelector('.sign');
const $commaButton = document.querySelector('.comma');
const $percentageButton = document.querySelector('.persent');
const $input = document.querySelector('#input');

let result = ""
let freeze = ""

$clearButton.addEventListener('click', clearResult)
$calculateButton.addEventListener('click', calculateResult)
$signButton.addEventListener('click', changeSign)
$commaButton.addEventListener('click', addComma)
$percentageButton.addEventListener('click', convertToPercentage)

function convertToPercentage() {
    const num = +$input.value.replace(/,/g, '.')
    if (!isNaN(num)) $input.value = `${num * 100}%`
}

function addComma() {
    $input.value += ','
    result += '.'
}

function changeSign() {
    const num = +$input.value;
    if (isNaN(num)) {
        $input.value = `-(${$input.value})`
        result = `-(${result})`
    } else {
        $input.value = `${-num}`
        result = `${-num}`
    }
}

function clearResult() {
    freeze = false;
    result = ""
    $input.value = "0"
}
$numOperations.forEach(($numOperations) => {
    $numOperations.addEventListener('click', handleButtonClick)
})

function handleButtonClick(event) {

    if (freeze) {
        event.preventDefault()
        return
    }
    let value = event.target.innerText;

    if (value === "=") {
        return
    }

    if ($input.value === 0 && value === 0) {
        return
    }

    if (result.length === 0) {
        $input.value = ""
    }

    const operators = ['÷', '×', '-', '+']

    if (operators.includes(result[result.length - 1]) && operators.includes(value)) {
        $input.value = $input.value.replace(/.$/, value)
        result = $input.value.replace(/.$/, value)
        return
    }


    result += value
    $input.value += value;
}

function calculateResult() {
    try {
        result = result.replace(/×/g, '*').replace(/÷/g, '/');
        $input.value = `${eval(result)}`.replace(/\./g, ',')
        // freeze = true
    } catch (e) {
        $input.value = "Error"
        setTimeout(() => {
            if (confirm("Error!")) {
                clearResult()
            }
        }, 0)
    }
}
