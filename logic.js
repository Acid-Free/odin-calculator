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

  // Assumption: at this point, num2 cannot be Infinity
  if (num1 === Infinity) num1 = 0;

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
    lowerValue = result === Infinity ? "You can't do that..." : result;
  }
  // If an operator is selected, place the left operand along with the operator up top
  // If leftOperand is Infinity, just show 0: operate() should take care of the conversions
  else if (currentOperator) {
    upperValue = `${
      leftOperand ? (leftOperand === Infinity ? 0 : leftOperand) : 0
    } ${currentOperator}`;
    // If rightOperand is empty, show the leftOperand
    // Note that rightOperand is not being assigned the leftOperand value
    lowerValue = rightOperand
      ? rightOperand
      : leftOperand === Infinity
      ? 0
      : leftOperand;
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
  // added third condition (parseFloat...) to make sure that input does not represent zero when converted to number
  return containsDot && noFractional;
};

function getResult() {
  const result = operate(currentOperator, leftOperand, rightOperand);
  leftOperand = "";
  rightOperand = "";
  currentOperator = "";
  return result;
}

function performOperation(operation) {
  // if there is a result and an operator is selected, result will be discarded and its value will be assigned to leftOperand
  if (result) {
    leftOperand = result;
    result = "";
  }

  // invoke operate() if leftOperand and rightOperand are not empty
  // note that if rightOperand is present, leftOperand can be assumed to exist too
  // after assigning a value to result, this function is called again because choosing the currentOperator is the initial reason for invoking it in the first place, added return to prevent execution duplication
  if (rightOperand) {
    result = getResult();
    performOperation(operation);
    return;
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
        case "add":
        case "subtract":
        case "multiply":
        case "divide":
          performOperation(e.target.className);
          break;
        case "equals":
          result = getResult();
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
            if (![...rightOperand].includes("."))
              rightOperand = rightOperand === "" ? "0." : rightOperand + ".";
          } else {
            if (![...leftOperand].includes("."))
              leftOperand = leftOperand === "" ? "0." : leftOperand + ".";
          }
          break;
        default:
          const buttonText = e.target.innerText;
          // If there is a result and user enters a number instead of operator, discard result
          if (result) result = "";

          if (currentOperator) {
            // Don't add zero if operand is empty (empty string ("") is represented by 0 in updateDisplay())
            if (buttonText === "0" && !rightOperand) return;
            rightOperand += buttonText;
          } else {
            if (buttonText === "0" && !leftOperand) return;
            leftOperand += buttonText;
          }
      }
      updateDisplay();
    });
  });
};

addButtonEvents();
updateDisplay();
