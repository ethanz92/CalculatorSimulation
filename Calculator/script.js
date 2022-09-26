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
  //6=3=  6/2=
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

function handleOperatorClick(operator) {
  //3+6=
  const currentValue = Number(calculatorDisplay.textContent);
  //3+-
  if (operatorValue && isFirstDigitOfNextValue) {
    operatorValue = operator; //第二个operator替代
    return; //不做计算
  }
  //+6=
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    // 3+6= 3+6+
    const result = calculate[operatorValue](firstValue, currentValue); //object[]拿到的是function，所以还要pass两个arguments
    calculatorDisplay.textContent = result;
    //3+6+8
    firstValue = result;
  }
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
