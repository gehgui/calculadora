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

  formatDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(",")[0]);
    const decimalDigits = stringNumber.split(",")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("de-DE", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }

  calculate() {
    let result;
    const previousOperationFloat = parseFloat(this.previousOperation);
    const currentOperationFloat = parseFloat(this.currentOperation);

    if (isNaN(previousOperationFloat) || isNaN(currentOperationFloat)) return;

    switch (this.operator) {
      case "+":
        result = previousOperationFloat + currentOperationFloat;
        break;
      case "-":
        result = previousOperationFloat - currentOperationFloat;
        break;
      case "×":
        result = previousOperationFloat * currentOperationFloat;
        break;
      case "÷":
        result = previousOperationFloat / currentOperationFloat;
        break;
      default:
        result;
    }

    this.currentOperation = result;
    this.operator = undefined;
    this.previousOperation = "";
  }

  chooseOperatior(operator) {
    if (this.currentOperation == "") return;
    if (this.previousOperation != "") {
      this.calculate();
    }

    this.operator = operator;
    this.previousOperation = this.currentOperation;
    this.currentOperation = "";
  }

  appendNumber(number) {
    if (this.currentOperation.includes(",") && number === ",") return;
    this.currentOperation = `${this.currentOperation}${number.toString()}`;
  }

  clear() {
    this.previousOperation = "";
    this.currentOperation = "";
    this.operator = undefined;
  }

  updateDisplay() {
    this.previousOperationText.innerText = `${this.previousOperation} ${
      this.operator || ""
    }`;
    this.currentOperationText.innerText = calculator.formatDisplayNumber(
      this.currentOperation
    );
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

equalButtons.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButtons.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
