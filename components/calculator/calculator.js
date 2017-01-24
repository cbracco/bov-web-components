// Define public variables
var calcScreen = document.getElementById('js-calculator-screen'),
    calcNumber = '.js-calculator-number',
    calcSymbol = '.js-calculator-symbol',
    calcEval = '.js-calculator-eval',
    calcClear = '.js-calculator-clear',
    calcDelete = '.js-calculator-delete',
    calcString = '',
    lastClicked = '';

// Add a click event listener to the document
document.body.addEventListener('click', function (event) {
  // Numbers
  if (event.target && event.target.matches(calcNumber)) {
    // Empty calcString value if eval was the last button clicked
    if (lastClicked === 'eval') {
      calcString = '';
    }
    // Update lastClicked flag
    lastClicked = 'number';
    // Append innerText of clicked element to calcString
    calcString += event.target.innerText;
    // Update calcScreen innerText value
    calcScreen.innerText = calcString;
  }

  // Symbols
  if (event.target && event.target.matches(calcSymbol)) {
    // Ensure only one symbol at a time in calcString
    if (lastClicked !== 'symbol') {
      // Update lastClicked flag
      lastClicked = 'symbol';
      // Append value of clicked element to calcString
      calcString += event.target.innerText;
      // Update calcScreen value
      calcScreen.innerText = calcString;
    }
  }

  // Evaluate
  if (event.target && event.target.matches(calcEval)) {
    // Only evaluate if calcScreen value is non-zero and if the lastClicked
    // element was not a previous evaluation
    if (calcScreen.innerText !== '0' && lastClicked !== 'eval') {
      // Update lastClicked flag
      lastClicked = 'eval';
      // Store the calcScreen value as an expression
      var calcExpression = calcScreen.innerText;
      // Set calcString equal to the evaluation of the expression
      calcString = eval(calcExpression).toString();
      // Update calcScreen value
      calcScreen.innerText = calcString;
    }
  }

  // Clear
  if (event.target && event.target.matches(calcClear)) {
    // Reset calcScreen value back to 0
    calcScreen.innerText = '0';
    // Empty calcString value
    calcString = '';
  }

  // Delete
  if (event.target && event.target.matches(calcDelete)) {
    // Reset calcScreen value back to 0 if calcScreen value is only 1 character
    if (calcScreen.innerText.length === 1) {
      calcScreen.innerText = '0';
    } else {
      // Set calcString equal to itself minus its last character
      calcString = calcString.slice(0, calcString.length - 1);
      // Update calcScreen value
      calcScreen.innerText = calcString;
    }
  }
});
