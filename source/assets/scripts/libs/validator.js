(function (window) {

  // Define object
  validator = {};

  /**
   * Validates whether input is an email address
   * Criteria: two strings combined by an @ symbol
   * @param {string} email Email Address
   * @author Chris Bracco
   */
  validator.isEmailAddress = function (email) {

    // Check parameters
    if (!email) throw 'Missing parameter in isEmailAddress function: "email"';

    if (typeof email === 'string') {
      // If there are no '@' symbols, return false
      if (email.indexOf('@') === -1) {
        return false;
      } else {
        var segments = email.split('@');

        // Make sure there is only one '@' symbol
        if (segments.length === 2) {
          return true;
        }
      }
    }

    return false;

  };

  /**
   * Validates whether input is a United States phone number
   * Criteria: two strings combined by an @ symbol
   * @param {string} phone NANP Phone Number
   * @author Chris Bracco
   */
  validator.isPhoneNumber = function (phone) {

    // Check parameters
    if (!phone) throw 'Missing parameter in isPhoneNumber function: "phone"';

    // Ignore special characters, validate only numeric content
    var onlyNumbers = phone.replace(/[^0-9]/g, '');

    // Check if 10 digits long, and optionally if it begins with a 1
    var regex = /^1?([2-9]..)([2-9]..)(....)$/;
    if (regex.test(onlyNumbers)) {
      return true;
    }

    return false;

  };

  /**
   * Remove all non-alphanumeric characters from a string
   * @param {string} str Any string
   * @author Chris Bracco
   */
  validator.withoutSymbols = function (str) {

    // Check parameters
    if (!str) throw 'Missing parameter in withoutSymbols function: "str"';

    // Return string without symbols
    return str.replace(/[^\w\s]/gi, '');

  };

  /**
   * Check if input is a valid date
   * @param {string} date
   * @author Chris Bracco
   */
  validator.isDate = function (date) {

    // Check parameters
    if (!date) throw 'Missing parameter in isDate function: "date"';
    if (typeof date !== 'string') throw new TypeError('Parameter "date" must be a string.');

    var dateObj = Date.parse(date);

    if (!isNaN(dateObj)) {
      return true;
    }

    return false;

  };

  /**
   * Check if input is a date that comes after the reference date
   * @param {Date|string} input
   * @param {Date|string} reference
   * @author Chris Bracco
   */
  validator.isBeforeDate = function (input, reference) {

    // Check parameters
    if (input instanceof Date === false && typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a Date or string.');
    }
    if (reference instanceof Date === false && typeof reference !== 'string') {
      throw new TypeError('Parameter "reference" must be a Date or string.');
    }

    // Store the dates
    var inputDate = input;
    var referenceDate = reference;

    // Convert to Date objects if strings
    if (typeof input === 'string') {
      inputDate = new Date(input);
    }
    if (typeof reference === 'string') {
      referenceDate = new Date(reference);
    }

    // Compare Date objects and return the result
    return inputDate < referenceDate;

  };

  /**
   * Check if input is a date that comes before the reference date
   * @param {Date|string} input
   * @param {Date|string} reference
   * @author Chris Bracco
   */
  validator.isAfterDate = function (input, reference) {

    // Check parameters
    if (input instanceof Date === false && typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a Date or string.');
    }
    if (reference instanceof Date === false && typeof reference !== 'string') {
      throw new TypeError('Parameter "reference" must be a Date or string.');
    }

    // Store the dates
    var inputDate = input;
    var referenceDate = reference;

    // Convert to Date objects if strings
    if (typeof input === 'string') {
      inputDate = new Date(input);
    }
    if (typeof reference === 'string') {
      referenceDate = new Date(reference);
    }

    // Compare Date objects and return the result
    return inputDate > referenceDate;

  };

  /**
   * Check if input is a date that comes before today
   * @param {Date|string} input
   * @author Chris Bracco
   */
  validator.isBeforeToday = function (input) {

    // Check parameters
    if (input instanceof Date === false && typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a Date or string.');
    }

    // Store dates
    var inputDate = input;
    var today = new Date();

    // Convert to Date objects if strings
    if (typeof input === 'string') {
      inputDate = new Date(input);
    }

    // Compare Date objects and return the result
    return inputDate < today;

  };

  /**
   * Check if input is a date that comes after today
   * @param {Date|string} input
   * @author Chris Bracco
   */
  validator.isAfterToday = function (input) {

    // Check parameters
    if (input instanceof Date === false && typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a Date or string.');
    }

    // Store dates
    var inputDate = input;
    var today = new Date();

    // Convert to Date objects if strings
    if (typeof input === 'string') {
      inputDate = new Date(input);
    }

    // Compare Date objects and return the result
    return inputDate > today;

  };

  /**
   * Check if input is an empty string
   * @param {string} input
   * @author Chris Bracco
   */
  validator.isEmpty = function (input) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }

    // Check if string is empty or only contains whitespace
    if (input === '' || !(input.replace(/\s/g, '').length)) {
      return true;
    }

    return false;

  };

  /**
   * Check if input contains one or more words in words array
   * @param {string} input
   * @param {Array} words
   * @author Chris Bracco
   */
  validator.contains = function (input, words) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }
    if (words.constructor !== Array) {
      throw new TypeError('Parameter "words" must be an array.');
    }

    // Check if any words in array are in the string
    if (words.some(function (w) { return input.indexOf(w) >= 0; })) {
      return true;
    }

    return false;

  };

  /**
   * Check if input lacks one or more words in words array
   * @param {string} input
   * @param {Array} words
   * @author Chris Bracco
   */
  validator.lacks = function (input, words) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }
    if (words.constructor !== Array) {
      throw new TypeError('Parameter "words" must be an array.');
    }

    // Check if any words in array are in the string
    if (words.some(function (w) { return input.indexOf(w) >= 0; })) {
      return false;
    }

    return true;

  };

  /**
   * Check if input is composed of one or more items in the array
   * @param {string} input
   * @param {Array} strings
   * @author Chris Bracco
   */
  validator.isComposedOf = function (input, strings) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }
    if (strings.constructor !== Array) {
      throw new TypeError('Parameter "strings" must be an array.');
    }

    // Check if any strings in array are in the input string
    if (strings.some(function (str) { return input.indexOf(str) >= 0; })) {
      return true;
    }

    return false;

  };

  /**
   * Check if input character count is less than or equal to provided count
   * @param {string} input
   * @param {Number} n
   * @author Chris Bracco
   */
  validator.isLength = function (input, n) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }
    if (typeof n !== 'number' && Math.floor(n) === n) {
      throw new TypeError('Parameter "n" must be an integer.');
    }

    // If input length is less than or equal to n
    if (input.length <= n) {
      return true;
    }

    return false;

  };

  /**
   * Check if input character count is greater than or equal to provided count
   * @param {string} input
   * @param {Number} n
   * @author Chris Bracco
   */
  validator.isOfLength = function (input, n) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }
    if (typeof n !== 'number' && Math.floor(n) === n) {
      throw new TypeError('Parameter "n" must be an integer.');
    }

    // If input length is greater than or equal to n
    if (input.length >= n) {
      return true;
    }

    return false;

  };

  /**
   * Count the number of words in a given string
   * @param {string} input
   * @author Chris Bracco
   */
  validator.countWords = function (input) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }

    return input.split(/\s+/).length;

  };

  /**
   * Check if input has a word count less than or equal to provided count
   * @param {string} input
   * @param {Number} n
   * @author Chris Bracco
   */
  validator.lessWordsThan = function (input, n) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }
    if (typeof n !== 'number' && Math.floor(n) === n) {
      throw new TypeError('Parameter "n" must be an integer.');
    }

    if (input.split(/\s+/).length <= n) {
      return true;
    }

    return false;

  };

  /**
   * Check if input has a word count greater than or equal to provided count
   * @param {string} input
   * @param {Number} n
   * @author Chris Bracco
   */
  validator.moreWordsThan = function (input, n) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }
    if (typeof n !== 'number' && Math.floor(n) === n) {
      throw new TypeError('Parameter "n" must be an integer.');
    }

    if (input.split(/\s+/).length >= n) {
      return true;
    }

    return false;

  };

  /**
   * Check if input has a word count in between the provided range
   * @param {string} input
   * @param {Number} floor
   * @param {Number} ceil
   * @author Chris Bracco
   */
  validator.isBetween = function (input, floor, ceil) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }
    if (typeof floor !== 'number' && Math.floor(floor) === floor) {
      throw new TypeError('Parameter "floor" must be an integer.');
    }
    if (typeof ceil !== 'number' && Math.floor(ceil) === ceil) {
      throw new TypeError('Parameter "ceil" must be an integer.');
    }

    if (input.split(/\s+/).length >= floor && input.split(/\s+/).length <= ceil) {
      return true;
    }

    return false;

  };

  /**
   * Check if input is only composed of letters and numbers
   * @param {string} input
   * @author Chris Bracco
   */
  validator.isAlphanumeric = function (input) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }

    var char;

    // Check if any non-alphanumeric characters exist
    for (var i = 0; i < input.length; i++) {
      char = input.charCodeAt(i);
      if (!(char > 47 && char < 58) &&  // 0-9
          !(char > 64 && char < 91) &&  // A-Z
          !(char > 96 && char < 123)) { // a-z
        return false;
      }
    }

    return true;

  };

  /**
   * Check if input is a valid credit card number
   * @param {string} input
   * @author Chris Bracco
   */
  validator.isCreditCard = function (input) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }

    // Accept only alphanumeric or dashes
    if (/[^a-zA-Z0-9-]/.test(input)) {
      return false;
    }

    // Make sure string is 16 characters after hyphens are removed
    if (input.replace(/-/g, '').length !== 16) {
      return false;
    }

    return true;

  };

  /**
   * Check if input is a hexidecimal color
   * @param {string} input
   * @author Chris Bracco
   */
  validator.isHex = function (input) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }

    // Check format of string
    if (!(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/i.test(input))) {
      return false;
    }

    return true;

  };

  /**
   * Check if input is an RGB color
   * @param {string} input
   * @author Chris Bracco
   */
  validator.isRGB = function (input) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }

    // Check beginning and ending format of string
    if (input.substring(0, 4) !== 'rgb(' && input.charAt(input.length - 1) !== ')') {
      return false;
    }

    // Check amount of numbers and if they were correctly split by commas
    var nums = input.substring(4, input.length - 1).replace(/ /g, '').split(',');
    if (nums.length !== 3) {
      return false;
    }

    // Check if each number is within the accepted range
    for (i in nums) {
      if (parseInt(nums[i]) < 0 && parseInt(nums[i]) > 255) {
        return false;
      }
    }

    return true;

  };

  /**
   * Check if input is an HSL color
   * @param {string} input
   * @author Chris Bracco
   */
  validator.isHSL = function (input) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }

    // Check beginning and ending format of string
    if (input.substring(0, 4) !== 'hsl(' && input.charAt(input.length - 1) !== ')') {
      return false;
    }

    // Check amount of numbers and if they were correctly split by commas
    var nums = input.substring(4, input.length - 1).replace(/ /g, '').split(',');
    if (nums.length !== 3) {
      return false;
    }
    // Check if each number is within the accepted range
    if ((parseInt(nums[0]) < 0 && parseInt(nums[0]) > 360) &&
        (parseFloat(nums[1]) < 0 && parseFloat(nums[1]) > 1) &&
        (parseFloat(nums[2]) < 0 && parseFloat(nums[2]) > 1)) {
      return false;
    }

    return true;

  };

  /**
   * Check if input is a color
   * @param {string} input
   * @author Chris Bracco
   */
  validator.isColor = function (input) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }

    // Hex check
    if ((/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/i.test(input))) {
      return true;
    }

    // RGB/HSL check
    if ((input.substring(0, 4) === 'rgb(' || input.substring(0, 4) === 'hsl(') && input.charAt(input.length - 1) === ')') {
      var nums = input.substring(4, input.length - 1).replace(/ /g, '').split(',');
      // Length check
      if (nums.length !== 3) {
        return false;
      }
      // RGB check
      if (input.substring(0, 4) === 'rgb(') {
        for (i in nums) {
          if (parseInt(nums[i]) >= 0 && parseInt(nums[i]) <= 255) {
            return true;
          }
        }
      }
      // HSL check
      if (input.substring(0, 4) === 'hsl(') {
        if ((parseInt(nums[0]) >= 0 && parseInt(nums[0]) <= 360) &&
            (parseFloat(nums[1]) >= 0 && parseFloat(nums[1]) <= 1) &&
            (parseFloat(nums[2]) >= 0 && parseFloat(nums[2]) <= 1)) {
          return true;
        }
      }
    }

    return false;

  };

  /**
   * Check if input has leading or trailing whitespace, or too many spaces
   * between words
   * @param {string} input
   * @author Chris Bracco
   */
  validator.isTrimmed = function (input) {

    // Check parameters
    if (typeof input !== 'string') {
      throw new TypeError('Parameter "input" must be a string.');
    }

    // Check leading/trailing whitespace in entire string
    if (input.charAt(0) === ' ' || input.charAt(input.length - 1) === ' ') {
      return false;
    }

    // Check if more than one whitespace between words
    if (!/^(\w+\s?)*\s*$/.test(input)) {
      return false;
    }

    return true;

  };

})(window);
