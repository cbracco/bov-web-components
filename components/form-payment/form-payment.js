// Get form
var payment = document.getElementById('js-form-payment');
// Store form element values
var paymentCardNumber = document.getElementById('paymentCardNumber');
var paymentCardCode = document.getElementById('paymentCardCode');
var paymentCardName = document.getElementById('paymentCardName');
var paymentCardExpirationMonth = document.getElementById('paymentCardExpirationMonth');
var paymentCardExpirationYear = document.getElementById('paymentCardExpirationYear');

// Add event listener
payment.addEventListener('submit', function (event) {

  // Stop the event from its default action: submitting the form
  // (for our validation, submission is not desired)
  event.preventDefault();

  // Card Number
  // Check that value is not empty and is a valid credit card number
  if (validator.isEmpty(paymentCardNumber.value) || !(validator.isCreditCard(paymentCardNumber.value))) {
    paymentCardNumber.classList.remove('is-valid');
    paymentCardNumber.classList.add('is-invalid');
  } else {
    paymentCardNumber.classList.remove('is-invalid');
    paymentCardNumber.classList.add('is-valid');
  }

  // Card Code
  // Check that value is not empty and is the proper length
  if (validator.isEmpty(paymentCardCode.value) || validator.isLength(paymentCardCode.value, 2)) {
    paymentCardCode.classList.remove('is-valid');
    paymentCardCode.classList.add('is-invalid');
  } else {
    paymentCardCode.classList.remove('is-invalid');
    paymentCardCode.classList.add('is-valid');
  }

  // Card Name
  // Check that value is not empty
  if (validator.isEmpty(paymentCardName.value)) {
    paymentCardName.classList.remove('is-valid');
    paymentCardName.classList.add('is-invalid');
  } else {
    paymentCardName.classList.remove('is-invalid');
    paymentCardName.classList.add('is-valid');
  }

  // Card Expiration Month
  // Check that value is not empty or initial value
  if (validator.isEmpty(paymentCardExpirationMonth.value) || paymentCardExpirationMonth.value === 'MM') {
    paymentCardExpirationMonth.classList.remove('is-valid');
    paymentCardExpirationMonth.classList.add('is-invalid');
  } else {
    paymentCardExpirationMonth.classList.remove('is-invalid');
    paymentCardExpirationMonth.classList.add('is-valid');
  }

  // Card Expiration Year
  // Check that value is not empty or initial value
  if (validator.isEmpty(paymentCardExpirationYear.value) || paymentCardExpirationYear.value === 'YYYY') {
    paymentCardExpirationYear.classList.remove('is-valid');
    paymentCardExpirationYear.classList.add('is-invalid');
  } else {
    paymentCardExpirationYear.classList.remove('is-invalid');
    paymentCardExpirationYear.classList.add('is-valid');
  }

});
