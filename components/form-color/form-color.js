// Get form
var color = document.getElementById('js-form-color');
// Store form element values
var colorRGBA = document.getElementsByName('colorRGBA');

// Add event listener
color.addEventListener('submit', function (event) {

  // Stop the event from its default action: submitting the form
  // (for our validation, submission is not desired)
  event.preventDefault();

  // Radio Group
  // Check that any range slider was moved from initial 0 position
  var changed;
  for (var i = 0; i < colorRGBA.length; i++) {
    if (colorRGBA[i].value !== '0') {
      changed = true;
      break;
    } else {
      changed = false;
    }
  }
  if (changed) {
    for (var i = 0; i < colorRGBA.length; i++) {
      colorRGBA[i].classList.remove('is-invalid');
      colorRGBA[i].classList.add('is-valid');
    }
  } else {
    for (var i = 0; i < colorRGBA.length; i++) {
      colorRGBA[i].classList.remove('is-valid');
      colorRGBA[i].classList.add('is-invalid');
    }
  }

});
