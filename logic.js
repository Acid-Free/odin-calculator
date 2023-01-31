const buttons = document.querySelectorAll("button");
const upperOutput = document.querySelector(".upper-output");
const lowerOutput = document.querySelector(".lower-output");

let leftOperand = "";
let rightOperand = "";
let currentOperator = "";

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

  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      console.error("Invalid operation");
  }
};

const updateDisplay = () => {
  // if (currentOperator) {
  //   upperValue = `${leftOperand ? leftOperand : 0} ${currentOperator}`;
  //   lowerValue = `${rightOperand ? rightOperand : 0}`;
  // } else {
  //   upperValue = "";
  //   lowerValue = `${leftOperand ? leftOperand : 0}`;
  // }

  input.innerText = upperValue;
  output.innerText = lowerValue;
};

// checks a string if it represents a floating number without fractional part
const isWholeFloat = (input) => {
  const containsDot = [...input].includes(".");
  // if false, should mean that there is fractional part
  const noFractional = parseInt(input) === parseFloat(input);
  // if only noFractional is returned, this function would also return true for integers
  return containsDot && noFractional;
};

const addButtonEvents = () => {
  [...buttons].forEach((button) => {
    button.addEventListener("click", (e) => {
      switch (e.target.className) {
        case "equals":
          break;
        case "delete":
          console.warn("TODO");
          break;
        case "reset":
          leftOperand = 0;
          rightOperand = 0;
          currentOperator = "";
          break;
        case "percentage":
          console.warn("TODO");
          break;
        case "dot":
          break;
        case "add":
          break;
        case "subtract":
          break;
        case "multiply":
          break;
        case "divide":
          break;
        default:
          if (currentOperator) {
            rightOperand += e.target.innerText;
            const rightFloat = isWholeFloat(rightOperand);
            // converted back to string for dot evaluation
            rightOperand = parseFloat(rightOperand).toString();
            if (rightFloat) rightOperand += ".";
          } else {
            leftOperand += e.target.innerText;
            const leftFloat = isWholeFloat(leftOperand);
            leftOperand = parseFloat(leftOperand).toString();
            if (leftFloat) leftOperand += ".";
          }
      }
      updateDisplay();
    });
  });
};

addButtonEvents();
updateDisplay();
