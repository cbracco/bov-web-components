// Get form
var address = document.getElementById('js-form-address');
// Store form element values
var addressBillingFirstName = document.getElementById('addressBillingFirstName');
var addressBillingLastName = document.getElementById('addressBillingLastName');
var addressBillingStreetAddress1 = document.getElementById('addressBillingStreetAddress1');

// Add event listener
address.addEventListener('submit', function (event) {

  // Stop the event from its default action: submitting the form
  // (for our validation, submission is not desired)
  event.preventDefault();

  // Billing: First Name
  // Check that value is not empty and at least a length of two characters
  if (validator.isEmpty(addressBillingFirstName.value) || validator.isLength(addressBillingFirstName.value, 2)) {
    addressBillingFirstName.classList.remove('is-valid');
    addressBillingFirstName.classList.add('is-invalid');
  } else {
    addressBillingFirstName.classList.remove('is-invalid');
    addressBillingFirstName.classList.add('is-valid');
  }

  // Billing: Last Name
  // Check that value is not empty and at least a length of two characters
  if (validator.isEmpty(addressBillingLastName.value) || validator.isLength(addressBillingLastName.value, 2)) {
    addressBillingLastName.classList.remove('is-valid');
    addressBillingLastName.classList.add('is-invalid');
  } else {
    addressBillingLastName.classList.remove('is-invalid');
    addressBillingLastName.classList.add('is-valid');
  }

  // Billing: Street Address 1
  // Check that value is not empty
  if (validator.isEmpty(addressBillingStreetAddress1.value)) {
    addressBillingStreetAddress1.classList.remove('is-valid');
    addressBillingStreetAddress1.classList.add('is-invalid');
  } else {
    addressBillingStreetAddress1.classList.remove('is-invalid');
    addressBillingStreetAddress1.classList.add('is-valid');
  }

  // Billing: City
  // Check that value is not empty
  if (validator.isEmpty(addressBillingCity.value)) {
    addressBillingCity.classList.remove('is-valid');
    addressBillingCity.classList.add('is-invalid');
  } else {
    addressBillingCity.classList.remove('is-invalid');
    addressBillingCity.classList.add('is-valid');
  }

  // Billing: State
  // Check that value is not empty
  if (validator.isEmpty(addressBillingState.value) || addressBillingState.value === 'State') {
    addressBillingState.classList.remove('is-valid');
    addressBillingState.classList.add('is-invalid');
  } else {
    addressBillingState.classList.remove('is-invalid');
    addressBillingState.classList.add('is-valid');
  }

  // Billing: Zip
  // Check that value is not empty
  if (validator.isEmpty(addressBillingZip.value) || addressBillingZip.value.length !== 5) {
    addressBillingZip.classList.remove('is-valid');
    addressBillingZip.classList.add('is-invalid');
  } else {
    addressBillingZip.classList.remove('is-invalid');
    addressBillingZip.classList.add('is-valid');
  }

  // Billing: Country
  // Check that value is not empty
  if (validator.isEmpty(addressBillingCountry.value) || addressBillingCountry.value === 'Country') {
    addressBillingCountry.classList.remove('is-valid');
    addressBillingCountry.classList.add('is-invalid');
  } else {
    addressBillingCountry.classList.remove('is-invalid');
    addressBillingCountry.classList.add('is-valid');
  }

  // Shipping: First Name
  // Check that value is not empty and at least a length of two characters
  if (validator.isEmpty(addressShippingFirstName.value) || validator.isLength(addressShippingFirstName.value, 2)) {
    addressShippingFirstName.classList.remove('is-valid');
    addressShippingFirstName.classList.add('is-invalid');
  } else {
    addressShippingFirstName.classList.remove('is-invalid');
    addressShippingFirstName.classList.add('is-valid');
  }

  // Shipping: Last Name
  // Check that value is not empty and at least a length of two characters
  if (validator.isEmpty(addressShippingLastName.value) || validator.isLength(addressShippingLastName.value, 2)) {
    addressShippingLastName.classList.remove('is-valid');
    addressShippingLastName.classList.add('is-invalid');
  } else {
    addressShippingLastName.classList.remove('is-invalid');
    addressShippingLastName.classList.add('is-valid');
  }

  // Shipping: Street Address 1
  // Check that value is not empty
  if (validator.isEmpty(addressShippingStreetAddress1.value)) {
    addressShippingStreetAddress1.classList.remove('is-valid');
    addressShippingStreetAddress1.classList.add('is-invalid');
  } else {
    addressShippingStreetAddress1.classList.remove('is-invalid');
    addressShippingStreetAddress1.classList.add('is-valid');
  }

  // Shipping: City
  // Check that value is not empty
  if (validator.isEmpty(addressShippingCity.value)) {
    addressShippingCity.classList.remove('is-valid');
    addressShippingCity.classList.add('is-invalid');
  } else {
    addressShippingCity.classList.remove('is-invalid');
    addressShippingCity.classList.add('is-valid');
  }

  // Shipping: State
  // Check that value is not empty
  if (validator.isEmpty(addressShippingState.value) || addressShippingState.value === 'State') {
    addressShippingState.classList.remove('is-valid');
    addressShippingState.classList.add('is-invalid');
  } else {
    addressShippingState.classList.remove('is-invalid');
    addressShippingState.classList.add('is-valid');
  }

  // Shipping: Zip
  // Check that value is not empty
  if (validator.isEmpty(addressShippingZip.value) || addressShippingZip.value.length !== 5) {
    addressShippingZip.classList.remove('is-valid');
    addressShippingZip.classList.add('is-invalid');
  } else {
    addressShippingZip.classList.remove('is-invalid');
    addressShippingZip.classList.add('is-valid');
  }

  // Shipping: Country
  // Check that value is not empty
  if (validator.isEmpty(addressShippingCountry.value) || addressShippingCountry.value === 'Country') {
    addressShippingCountry.classList.remove('is-valid');
    addressShippingCountry.classList.add('is-invalid');
  } else {
    addressShippingCountry.classList.remove('is-invalid');
    addressShippingCountry.classList.add('is-valid');
  }

});
