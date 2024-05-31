let displayValue = '';

function appendToDisplay(value) {
    if (displayValue.length < 9) {
        displayValue += value;
        document.getElementById('display').value = displayValue;
    }
}

function clearDisplay() {
    displayValue = '';
    document.getElementById('display').value = displayValue;
}

function calculateResult() {
    let result = eval(displayValue);
    if (result.toString().length > 9) {
        result = result.toPrecision(6);
    }
    displayValue = result.toString();
    document.getElementById('display').value = displayValue;
}
