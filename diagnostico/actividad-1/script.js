function addToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    try {
        document.getElementById('display').value = eval(document.getElementById('display').value);
    } catch (e) {
        alert('Expresión inválida');
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}