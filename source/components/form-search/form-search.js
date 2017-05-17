// Get form
var search = document.getElementById('js-form-search')
// Store form element values
var searchTerms = document.getElementById('searchTerms')

// Add event listener
search.addEventListener('submit', function (event) {

  // Stop the event from its default action: submitting the form
  // (for our validation, submission is not desired)
  event.preventDefault()

  // Terms
  // Check that value is not empty
  if (validator.isEmpty(searchTerms.value)) {
    searchTerms.classList.remove('is-valid')
    searchTerms.classList.add('is-invalid')
  } else {
    searchTerms.classList.remove('is-invalid')
    searchTerms.classList.add('is-valid')
  }

})
