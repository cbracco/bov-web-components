// Get form
var signup = document.getElementById('js-form-signup')
// Store form element values
var signupFirstName = document.getElementById('signupFirstName')
var signupLastName = document.getElementById('signupLastName')
var signupEmailAddress = document.getElementById('signupEmailAddress')
var signupBirthdayMonth = document.getElementById('signupBirthdayMonth')
var signupBirthdayDay = document.getElementById('signupBirthdayDay')
var signupBirthdayYear = document.getElementById('signupBirthdayYear')
var signupPassword = document.getElementById('signupPassword')

// Add event listener
signup.addEventListener('submit', function (event) {

  // Stop the event from its default action: submitting the form
  // (for our validation, submission is not desired)
  event.preventDefault()

  // First Name
  // Check that value is not empty and at least a length of two characters
  if (validator.isEmpty(signupFirstName.value) || validator.isLength(signupFirstName.value, 2)) {
    signupFirstName.classList.remove('is-valid')
    signupFirstName.classList.add('is-invalid')
  } else {
    signupFirstName.classList.remove('is-invalid')
    signupFirstName.classList.add('is-valid')
  }

  // Last Name
  // Check that value is not empty and at least a length of two characters
  if (validator.isEmpty(signupLastName.value) || validator.isLength(signupLastName.value, 2)) {
    signupLastName.classList.remove('is-valid')
    signupLastName.classList.add('is-invalid')
  } else {
    signupLastName.classList.remove('is-invalid')
    signupLastName.classList.add('is-valid')
  }

  // Email Address
  // Check that value is not empty and it is a valid email address
  if (validator.isEmpty(signupEmailAddress.value) || !validator.isEmailAddress(signupEmailAddress.value)) {
    signupEmailAddress.classList.remove('is-valid')
    signupEmailAddress.classList.add('is-invalid')
  } else {
    signupEmailAddress.classList.remove('is-invalid')
    signupEmailAddress.classList.add('is-valid')
  }

  // Birthday
  // Check that the value is before today
  var bday = signupBirthdayMonth.value + ' ' + signupBirthdayDay.value + ', ' + signupBirthdayYear.value
  if (!validator.isBeforeToday(bday)) {
    signupBirthdayMonth.classList.remove('is-valid')
    signupBirthdayMonth.classList.add('is-invalid')
    signupBirthdayDay.classList.remove('is-valid')
    signupBirthdayDay.classList.add('is-invalid')
    signupBirthdayYear.classList.remove('is-valid')
    signupBirthdayYear.classList.add('is-invalid')
  } else {
    signupBirthdayMonth.classList.remove('is-invalid')
    signupBirthdayMonth.classList.add('is-valid')
    signupBirthdayDay.classList.remove('is-invalid')
    signupBirthdayDay.classList.add('is-valid')
    signupBirthdayYear.classList.remove('is-invalid')
    signupBirthdayYear.classList.add('is-valid')
  }

  // Password
  // Check that value is not empty and it is 6 to 8 characters long
  if (validator.isEmpty(signupPassword.value) || !(signupPassword.value.length >= 6 && signupPassword.value.length <= 8)) {
    signupPassword.classList.remove('is-valid')
    signupPassword.classList.add('is-invalid')
  } else {
    signupPassword.classList.remove('is-invalid')
    signupPassword.classList.add('is-valid')
  }
})
