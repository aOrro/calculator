let prevDiv = document.getElementById("prev");
let resultDiv = document.getElementById("result");
const numericButtonsArray = Array.from(
  document.getElementsByClassName("numeric")
);
const operandButtonsArray = Array.from(
  document.getElementsByClassName("operand")
);
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const convertButton = document.getElementById("convert");
let currentValue = "";
let previousValue, operation;

numericButtonsArray.forEach((btn) => {
  btn.addEventListener("click", addNumberToScreen);
});

operandButtonsArray.forEach((btn) => {
  btn.addEventListener("click", operationToDo);
});

equalsButton.addEventListener("click", operate);

clearButton.addEventListener("click", clearScreen);

convertButton.addEventListener("click", () => {
  operate();
  convertNumbersToLetters();
});

const addNumberToScreen = (e) => {
  const buttonValue = e.target.innerHTML;
  const containsDot = e.target.innerHTML === "." && currentValue.includes(".");

  if (containsDot) return;

  currentValue += buttonValue;

  if (resultDiv.innerHTML === "Infinity") return;

  resultDiv.innerHTML = currentValue;
};

const operationToDo = (e) => {
  resultDiv.innerHTML = "";

  if (previousValue) {
    operate();
    prevDiv.innerHTML = resultDiv.innerHTML + " " + e.target.innerHTML;
    previousValue = prevDiv.innerHTML;
    currentValue = "";
    resultDiv.innerHTML = "";
  } else {
    if (!currentValue) return;
    operation = e.target.innerHTML;
    previousValue = currentValue + " " + operation;
    currentValue = "";
    prevDiv.innerHTML = previousValue;
  }
};

const operate = () => {
  if (!previousValue) return;

  //This part of the code would split the previousValue in a number and the operand chosen
  const splitPreviousValue = previousValue.split(" ");
  let [num, operationChosen] = splitPreviousValue;
  const numericPreviousValue = parseInt(num);
  const numericCurrentValue = parseInt(currentValue);

  //Operation
  switch (operationChosen) {
    case "+":
      resultDiv.innerHTML = numericPreviousValue + numericCurrentValue;
      break;
    case "-":
      resultDiv.innerHTML = numericPreviousValue - numericCurrentValue;
      break;
    case "x":
      resultDiv.innerHTML = numericPreviousValue * numericCurrentValue;
      break;
    case "/":
      resultDiv.innerHTML = numericPreviousValue / numericCurrentValue;
      break;
  }
  /*After the operation is done, this 'deletes' the previousValue stored and sets the
  currentValue to the result displayed on the calculator's screen*/
  prevDiv.innerHTML = prevDiv.innerHTML + " " + currentValue;
  previousValue = null;
  currentValue = resultDiv.innerHTML;
};

const convertNumbersToLetters = () => {
  const dictionary = {
    1: "I",
    2: "Z",
    3: "R",
    4: "A",
    5: "S",
    6: "G",
    7: "T",
    8: "B",
    9: "P",
    0: "O",
  };
  const splitCurrent = currentValue.split("");
  const arrayToReturn = splitCurrent
    .map((item) => {
      return dictionary[item];
    })
    .join("");

  prevDiv.innerHTML = arrayToReturn;
};

const clearScreen = () => {
  operation = null;
  previousValue = "";
  currentValue = "";
  prevDiv.innerHTML = "";
  resultDiv.innerHTML = "";
};
