//---------- BOTONES NÚMEROS ----------
function onButton0Click() {
    let display = document.getElementById('display');
    display.value += '0';
}
let button0 = document.getElementById('button0');
button0.onclick = onButton0Click;


function onButton1Click() {
    let display = document.getElementById('display');
    display.value += '1';
}
let button1 = document.getElementById('button1');
button1.onclick = onButton1Click;


function onButton2Click() {
    let display = document.getElementById('display');
    display.value += '2';
}
let button2 = document.getElementById('button2');
button2.onclick = onButton2Click;


function onButton3Click() {
    let display = document.getElementById('display');
    display.value += '3';
}
let button3 = document.getElementById('button3');
button3.onclick = onButton3Click;


function onButton4Click() {
    let display = document.getElementById('display');
    display.value += '4';
}
let button4 = document.getElementById('button4');
button4.onclick = onButton4Click;


function onButton5Click() {
    let display = document.getElementById('display');
    display.value += '5';
}
let button5 = document.getElementById('button5');
button5.onclick = onButton5Click;


function onButton6Click() {
    let display = document.getElementById('display');
    display.value += '6';
}
let button6 = document.getElementById('button6');
button6.onclick = onButton6Click;


function onButton7Click() {
    let display = document.getElementById('display');
    display.value += '7';
}
let button7 = document.getElementById('button7');
button7.onclick = onButton7Click;


function onButton8Click() {
    let display = document.getElementById('display');
    display.value += '8';
}
let button8 = document.getElementById('button8');
button8.onclick = onButton8Click;


function onButton9Click() {
    let display = document.getElementById('display');
    display.value += '9';
}
let button9 = document.getElementById('button9');
button9.onclick = onButton9Click;


function onButtonDotClick() {
    let display = document.getElementById('display');
    display.value += '.';
}
let buttonDot = document.getElementById('buttonDot');
buttonDot.onclick = onButtonDotClick;


//---------- BOTONES OPERACIONES ----------
function onButtonPlusClick() {
    let display = document.getElementById('display');
    display.value += '+';
}
let buttonPlus = document.getElementById('buttonPlus');
buttonPlus.onclick = onButtonPlusClick;


function onButtonMinusClick() {
    let display = document.getElementById('display');
    display.value += '-';
}
let buttonMinus = document.getElementById('buttonMinus');
buttonMinus.onclick = onButtonMinusClick;


function onButtonMultiplyClick() {
    let display = document.getElementById('display');
    display.value += '*';
}
let buttonMultiply = document.getElementById('buttonMultiply');
buttonMultiply.onclick = onButtonMultiplyClick;


function onButtonDivisionClick() {
    let display = document.getElementById('display');
    display.value += '/';
}
let buttonDivision = document.getElementById('buttonDivision');
buttonDivision.onclick = onButtonDivisionClick;


//---------- BOTON IGUAL ----------
function calculate() {
    document.getElementById('display').value = eval(document.getElementById('display').value);
}

let buttonEqual = document.getElementById('buttonEqual');
buttonEqual.onclick = calculate; 


//---------- BOTON BORRAR ----------
function clearDisplay() {
    document.getElementById('display').value = '';
}

let buttonClear = document.getElementById('buttonClear');
buttonClear.onclick = clearDisplay; 