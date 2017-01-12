// Get form
var scheduling = document.getElementById('js-form-scheduling');
// Store form element values
var schedulingTimeZone = document.getElementById('schedulingTimeZone');
var schedulingEmailAddress = document.getElementById('schedulingEmailAddress');
var schedulingPhoneNumber = document.getElementById('schedulingPhoneNumber');

// Add event listener
scheduling.addEventListener('submit', function (event) {

  // Stop the event from its default action: submitting the form
  // (for our validation, submission is not desired)
  event.preventDefault();

  // Date
  // Check that value is not empty
  if (validator.isEmpty(schedulingDate.value)) {
    schedulingDate.classList.remove('is-valid');
    schedulingDate.classList.add('is-invalid');
  } else {
    schedulingDate.classList.remove('is-invalid');
    schedulingDate.classList.add('is-valid');
  }

  // Time
  // Check that value is not empty
  if (validator.isEmpty(schedulingTime.value)) {
    schedulingTime.classList.remove('is-valid');
    schedulingTime.classList.add('is-invalid');
  } else {
    schedulingTime.classList.remove('is-invalid');
    schedulingTime.classList.add('is-valid');
  }

  // Time Zone
  // Check that value is not empty or default value
  if (validator.isEmpty(schedulingTimeZone.value) || schedulingTimeZone.value === 'Select a Time Zone') {
    schedulingTimeZone.classList.remove('is-valid');
    schedulingTimeZone.classList.add('is-invalid');
  } else {
    schedulingTimeZone.classList.remove('is-invalid');
    schedulingTimeZone.classList.add('is-valid');
  }

  // Email Address
  // Check that value is not empty and it is a valid email address
  if (validator.isEmpty(schedulingEmailAddress.value) || !validator.isEmailAddress(schedulingEmailAddress.value)) {
    schedulingEmailAddress.classList.remove('is-valid');
    schedulingEmailAddress.classList.add('is-invalid');
  } else {
    schedulingEmailAddress.classList.remove('is-invalid');
    schedulingEmailAddress.classList.add('is-valid');
  }

  // Phone Number
  // Check that value is not empty and it is a valid phone number
  if (validator.isEmpty(schedulingPhoneNumber.value) || !validator.isPhoneNumber(schedulingPhoneNumber.value)) {
    schedulingPhoneNumber.classList.remove('is-valid');
    schedulingPhoneNumber.classList.add('is-invalid');
  } else {
    schedulingPhoneNumber.classList.remove('is-invalid');
    schedulingPhoneNumber.classList.add('is-valid');
  }

});
