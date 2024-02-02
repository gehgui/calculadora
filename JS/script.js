const previousOperationText = document.querySelector(
  "[data-previous-operation]"
);
const currentOperationText = document.querySelector("[data-current-operation]");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalButtons = document.querySelector("[data-equal]");
const deleteButtons = document.querySelector("[data-delete]");
const porcentageButtons = document.querySelector("[data-percentage]");
const allCleanButton = document.querySelector("[data-all-clean]");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
  }

  chooseOperatior(operator) {
    this.operator = operator;
    this.previousOperation = `${this.currentOperation} ${this.operator}`;
    this.currentOperation = "";
  }

  appendNumber(number) {
    if (this.currentOperation.includes(".") && number === ".") return;
    this.currentOperation = `${this.currentOperation}${number.toString()}`;
  }

  clear() {
    this.previousOperation = "";
    this.currentOperation = "";
    this.operator = undefined;
  }

  updateDisplay() {
    this.previousOperationText.innerText = this.previousOperation;
    this.currentOperationText.innerText = this.currentOperation;
  }
}

const calculator = new Calculator(previousOperationText, currentOperationText);

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operatorButton of operatorButtons) {
  operatorButton.addEventListener("click", () => {
    calculator.chooseOperatior(operatorButton.innerText);
    calculator.updateDisplay();
  });
}

allCleanButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
