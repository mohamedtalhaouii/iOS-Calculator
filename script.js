const $numOperations = [...document.querySelectorAll('.numbers, .operation')];
const $clearButton = document.querySelector('.clear');
const $calculateButton = document.querySelector('.equal');
const $input = document.querySelector('#input');

let result = ""
let freez  = ""

$clearButton.addEventListener('click', clearResult)
$calculateButton.addEventListener('click', calculateResult)

function clearResult() {
    freez = false;
    result = ""
    $input.value = "0"
}
$numOperations.forEach(($numOperations) => {
    $numOperations.addEventListener('click', handleButtonClick)
})

function handleButtonClick(event) {

    if (freez){
        event.preventDefault()
        return
    }
    let value = event.target.innerText;

	if (value === "=") {
		return
	}

    if ($input.value === 0 && value === 0){
        return
    }

    if (result.length === 0) {
        $input.value = ""
    }

    const operators = ['÷', '×' , '-' , '+']

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
        $input.value = eval(result)
        // freez = true
    } catch (e) {
      $input.value = "Error"
      setTimeout( () => {
        if (confirm("Error!")){
            clearResult
        }
      }, 0)
    }
}