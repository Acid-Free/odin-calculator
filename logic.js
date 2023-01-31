const buttons = document.querySelectorAll("button");
const upperOutput = document.querySelector(".upper-output");
const lowerOutput = document.querySelector(".lower-output");

let leftOperand = "";
let rightOperand = "";
let currentOperator = "";
let result = "";

const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const operate = (operator, num1, num2) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (isNaN(num1)) num1 = 0;
  // if num2 is empty, assign it the value of num1
  // Assumption: there is no way num2 is going to get a NaN value that is not ""
  if (isNaN(num2)) num2 = num1;

  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    // When equals is pressed without an operator
    case "":
      return num1;
    default:
      console.error(
        "Invalid operation: num1",
        num1,
        "op:",
        operator,
        "num2:",
        num2
      );
  }
};

const updateDisplay = () => {
  let upperValue = "";
  let lowerValue = "";
  if (result) {
    lowerValue = result;
  }
  // If an operator is selected, place the left operand along with the operator up top
  else if (currentOperator) {
    upperValue = `${leftOperand ? leftOperand : 0} ${currentOperator}`;
    // If rightOperand is empty, show the leftOperand
    // Note that rightOperand is not being assigned the leftOperand value
    lowerValue = rightOperand ? rightOperand : leftOperand;
  } else {
    lowerValue = `${leftOperand ? leftOperand : 0}`;
  }

  upperOutput.innerText = upperValue;
  lowerOutput.innerText = lowerValue;
};

// checks a string if it represents a floating number without fractional part
const isWholeFloat = (input) => {
  const containsDot = [...input].includes(".");
  // if false, should mean that there is fractional part
  const noFractional = parseInt(input) === parseFloat(input);
  // if only noFractional is returned, this function would also return true for integers
  return containsDot && noFractional;
};

function performOperation(operation) {
  // if there is a result and an operator is selected, result will be discarded and its value will be assigned to leftOperand
  if (result) {
    leftOperand = result;
    result = "";
  }

  switch (operation) {
    case "add":
      currentOperator = "+";
      break;
    case "subtract":
      currentOperator = "-";
      break;
    case "multiply":
      currentOperator = "x";
      break;
    case "divide":
      currentOperator = "/";
      break;
    default:
      console.error("Invalid operation in performOperation");
  }
}

const addButtonEvents = () => {
  [...buttons].forEach((button) => {
    button.addEventListener("click", (e) => {
      switch (e.target.className) {
        case "equals":
          result = operate(currentOperator, leftOperand, rightOperand);
          leftOperand = "";
          rightOperand = "";
          currentOperator = "";
          break;
        case "delete":
          console.warn("TODO");
          break;
        case "reset":
          leftOperand = "";
          rightOperand = "";
          currentOperator = "";
          result = "";
          break;
        case "percentage":
          console.warn("TODO");
          break;
        case "dot":
          if (currentOperator) {
            if (![...rightOperand].includes(".")) rightOperand += ".";
          } else {
            if (![...leftOperand].includes(".")) leftOperand += ".";
          }
          break;
        case "add":
        case "subtract":
        case "multiply":
        case "divide":
          performOperation(e.target.className);
          break;
        default:
          // If there is a result and user enters a number instead of operator, discard result
          if (result) result = "";

          if (currentOperator) {
            rightOperand += e.target.innerText;
            if (isWholeFloat(rightOperand)) rightOperand += ".";
          } else {
            leftOperand += e.target.innerText;
            if (isWholeFloat(leftOperand)) leftOperand += ".";
          }
      }
      updateDisplay();
    });
  });
};

addButtonEvents();
updateDisplay();
