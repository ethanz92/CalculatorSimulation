const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button"); //array
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let isFirstDigitOfNextValue = false; //按operator时切换成true

function handleNumberClick(number) {
  if (isFirstDigitOfNextValue) {
    calculatorDisplay.textContent = number;
    isFirstDigitOfNextValue = false;
  } else {
    const previousValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      previousValue === "0" ? number : previousValue + number;
  }
}

function handleDecimalClick() {
  if (isFirstDigitOfNextValue) return; //operator后不能直接加点
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

const calculate = {
    '+':(firNumber, secondNumber) => firNumber+secondNumber,
    '-':(firNumber, secondNumber) => firNumber-secondNumber,
    '*':(firNumber, secondNumber) => firNumber*secondNumber,
    '/':(firNumber, secondNumber) => firNumber/secondNumber,
    '=': (firNumber, secondNumber) => secondNumber,
}

function handleOperatorClick(operator) {
    //3+6=
    isFirstDigitOfNextValue = true;
    operatorValue = operator;
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => handleNumberClick(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () =>
      handleOperatorClick(inputBtn.value)
    );
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () =>
      handleDecimalClick(inputBtn.value)
    );
  }
});

function clearAll() {
  firstValue = 0;
  operatorValue = "";
  isFirstDigitOfNextValue = false;
  calculatorDisplay.textContent = "0";
}
clearBtn.addEventListener("click", clearAll);
