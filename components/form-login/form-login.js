// Get form
var login = document.getElementById('js-form-login')
// Store form element values
var loginEmailAddress = document.getElementById('loginEmailAddress')
var loginPassword = document.getElementById('loginPassword')

// Add event listener
login.addEventListener('submit', function (event) {

  // Stop the event from its default action: submitting the form
  // (for our validation, submission is not desired)
  event.preventDefault()

  // Email Address
  // Check that value is not empty and it is a valid email address
  if (validator.isEmpty(loginEmailAddress.value) || !validator.isEmailAddress(loginEmailAddress.value)) {
    loginEmailAddress.classList.remove('is-valid')
    loginEmailAddress.classList.add('is-invalid')
  } else {
    loginEmailAddress.classList.remove('is-invalid')
    loginEmailAddress.classList.add('is-valid')
  }

  // Password
  // Check that value is not empty and it is 6 to 8 characters long
  if (validator.isEmpty(loginPassword.value) || !(loginPassword.value.length >= 6 && loginPassword.value.length <= 8)) {
    loginPassword.classList.remove('is-valid')
    loginPassword.classList.add('is-invalid')
  } else {
    loginPassword.classList.remove('is-invalid')
    loginPassword.classList.add('is-valid')
  }
})
