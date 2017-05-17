// Get form
var questionnaire = document.getElementById('js-form-questionnaire')
// Store form element values
var questionnaireIceCream = document.getElementsByName('questionnaireIceCream')

// Add event listener
questionnaire.addEventListener('submit', function (event) {

  // Stop the event from its default action: submitting the form
  // (for our validation, submission is not desired)
  event.preventDefault()

  // Radio Group
  // Check that any radio is checked
  var checked
  for (var i = 0; i < questionnaireIceCream.length; i++) {
    if (questionnaireIceCream[i].checked) {
      checked = true
      break
    } else {
      checked = false
    }
  }
  if (checked) {
    for (var i = 0; i < questionnaireIceCream.length; i++) {
      questionnaireIceCream[i].parentNode.classList.remove('is-invalid')
      questionnaireIceCream[i].parentNode.classList.add('is-valid')
    }
  } else {
    for (var i = 0; i < questionnaireIceCream.length; i++) {
      questionnaireIceCream[i].parentNode.classList.remove('is-valid')
      questionnaireIceCream[i].parentNode.classList.add('is-invalid')
    }
  }

})
