/**
 * Define public variables
 */
var // Constants
    CART_CURRENCY_SYMBOL = '$',
    CART_ITEM_ID_PREFIX = 'cart-item-',
    CART_CODES = [
      {
        code: 'TAKE10OFF',
        discount: 0.10
      },
      {
        code: 'TAKE15OFF',
        discount: 0.15
      }
    ],
    // Cart elements
    cart = document.querySelector('.js-product-cart'),
    cartBtnToggle = document.querySelector('.js-product-cart-toggle'),
    cartAlertEmpty = document.querySelector('.js-product-cart-empty'),
    cartCodeUserInput = document.querySelector('.js-product-cart-code-input'),
    cartCodeAdd = document.querySelector('.js-product-cart-code-add'),
    cartTotalHtml = document.querySelector('.js-product-summary-total'),
    cartSubTotalHtml = document.querySelector('.js-product-summary-subtotal'),
    // Cart data
    cartContents = [],
    cartContentsHtml = [],
    cartActiveCode = [],
    cartSubTotal = 0,
    cartTotal = 0,
    // Product elements
    products = document.querySelectorAll('.js-product');

/**
 * A better way to round numbers in JavaScript
 * @tutorial http://www.jacklmoore.com/notes/rounding-in-javascript/
 */
var round = function (value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

/**
 * Check if an object property matches a value
 * @tutorial http://stackoverflow.com/a/19302725/2057448
 */
var hasValue = function (obj, key, value) {
  return obj.hasOwnProperty(key) && obj[key] === value;
};

/**
 * Insert HTML after a reference node
 * @tutorial http://stackoverflow.com/a/19302725/2057448
 */
var insertAfter = function (newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

/**
 * Add to cart
 */
var addToCart = function (id, image, name, quantity, desc, price, priceCurrent) {
  // Create new cart item element
  var template = document.getElementById('js-template-product-cart-item').innerHTML,
      item = document.createElement('tr');

  // Insert template contents into item
  item.className = 'product-cart-item product-cart-table-row js-product-cart-item';
  item.innerHTML = template;

  // Insert data from parameters into item
  item.id = CART_ITEM_ID_PREFIX + id;
  item.querySelector('.js-product-cart-item-image').parentNode.title = name;
  item.querySelector('.js-product-cart-item-image').src = image;
  item.querySelector('.js-product-cart-item-image').alt = name;
  item.querySelector('.js-product-cart-item-heading').title = name;
  item.querySelector('.js-product-cart-item-heading').innerText = name;
  item.querySelector('.js-product-cart-item-description').innerText = desc;
  item.querySelector('.js-product-cart-item-quantity').value += 1;
  item.querySelector('.js-product-cart-item-price').innerText = price;
  item.querySelector('.js-product-cart-item-price-current').innerText = priceCurrent;

  // Hide empty message
  cartAlertEmpty.classList.add('u-hidden');

  // Prevent an item from being added to the cart twice
  if (!document.getElementById(item.id)) {
    // Append HTML to document
    document.querySelector('.js-product-cart-table-body').append(item);

    // Update cart contents
    cartContentsHtml = document.querySelectorAll('.js-product-cart-item');

    // Push data into an array that we will use for calculations
    cartContents.push({
      'id': CART_ITEM_ID_PREFIX + id,
      'imageUrl': image,
      'name': name,
      'quantity': quantity,
      'desc': desc,
      'price': price.slice(1),
      'priceCurrent': priceCurrent.slice(1)
    });

    // Update cart summary
    updateCartSummary();
  } else {
    // Otherwise alert user that item is already in cart
    alert('This item is already in your cart.');
  }
};

/**
 * Remove from cart
 */
var removeFromCart = function (item) {
  // Remove the cart item from data array
  for (var i = 0; i < cartContents.length; i++) {
    if (item.id === cartContents[i].id) {
      cartContents.splice(i, 1);
    }
  }

  // Remove the cart item from the document
  item.remove();

  // Update cart summary
  updateCartSummary();

  // If cart is empty
  if (!cartContentsHtml.length) {
    // Reset cart summary to 0
    cartSubTotal = 0;
    cartSubTotalHtml.innerText = CART_CURRENCY_SYMBOL + '0.00';
    cartTotal = 0;
    cartTotalHtml.innerText = CART_CURRENCY_SYMBOL + '0.00';
    // Show the empty message
    cartAlertEmpty.classList.remove('u-hidden');
  }
};

/**
 * Update summary
 */
var updateCartSummary = function (discount) {
  // Get cart contents
  cartContentsHtml = document.querySelectorAll('.js-product-cart-item');

  // Reset the summary prices each time for a fresh calculation
  cartSubTotal = 0;

  // Recalculate summary prices
  for (var i = 0 ; i < cartContents.length; i++) {
    cartSubTotal += cartContents[i].priceCurrent * cartContents[i].quantity;
  }

  // Round subtotal to 2 decimal places
  cartTotal = round(cartSubTotal, 2);

  // Use toFixed() to ensure trailing zeros
  // NOTE: this converts type to string
  cartSubTotalHtml.innerText = CART_CURRENCY_SYMBOL + cartSubTotal.toFixed(2);
  cartTotalHtml.innerText = CART_CURRENCY_SYMBOL + cartTotal.toFixed(2);

  // Apply promo code
  applyPromoCode();
};

/**
 * Apply promo code
 */
var applyPromoCode = function () {
  // If there is an active promo code
  if (cartActiveCode.length > 0) {
    var cartCodeSavings = round((cartTotal * cartActiveCode[0].discount), 2),
        cartCodeSavingsHtml = document.querySelector('.js-product-summary-row-code-amount');

    // Update the amount saved in the summary table
    // Use toFixed() to ensure trailing zeros
    // NOTE: this converts type to string
    cartCodeSavingsHtml.innerText = '-' + CART_CURRENCY_SYMBOL + cartCodeSavings.toFixed(2) + '(' + (cartActiveCode[0].discount * 100) + '%)';

    // Update the cart total
    cartTotal = round((cartTotal - (cartTotal * cartActiveCode[0].discount)), 2);

    // Use toFixed() to ensure trailing zeros
    // NOTE: this converts type to string
    cartTotalHtml.innerText = CART_CURRENCY_SYMBOL + cartTotal.toFixed(2);
  }
};

/**
 * Click events for products
 */
for (var i = 0; i < products.length; i++) {
  // Attach an event listener to each product
  products[i].addEventListener('click', function (event) {
    // If user clicks the add to cart button
    if (event.target && event.target.matches('.js-product-add')) {
      // Get data from product nodes
      var product = event.currentTarget,
          productId = product.id,
          productImageUrl = product.querySelector('.js-product-image').src,
          productName = product.querySelector('.js-product-heading').innerText,
          productQuantity = 1,
          productDesc = product.querySelector('.js-product-description').innerText,
          productPrice = product.querySelector('.js-product-price-original').innerText,
          productPriceCurrent = product.querySelector('.js-product-price-current').innerText;

      // Add product to the cart
      addToCart(
        productId,
        productImageUrl,
        productName,
        productQuantity,
        productDesc,
        productPrice,
        productPriceCurrent
      );
    }
  });
}

/**
 * Click events for cart
 */
cart.addEventListener('click', function (event) {
  // If user clicks the remove button
  if (event.target && event.target.matches('.js-product-remove')) {
    var cartItem = event.target.parentNode.parentNode;
    removeFromCart(cartItem);
  }
});

/**
 * Input events for cart
 */
cart.addEventListener('input', function (event) {
  // If quantity value is changed
  if (event.target && event.target.matches('.js-product-cart-item-quantity')) {
    var cartItemQuantity = parseInt(event.target.value);
    var cartItem = event.target.parentNode.parentNode;

    // Update data for cart item quantity
    for (var i = 0; i < cartContents.length; i++) {
      if (cartItem.id === cartContents[i].id) {
        cartContents[i].quantity = cartItemQuantity;

        // Remove item from the cart if quantity is changed to 0
        if (cartContents[i].quantity === 0) {
          removeFromCart(cartItem);
        } else {
          // Otherwise update the cart summary
          updateCartSummary();
        }
      }
    }
  }
});

/**
 * Click events for cart toggle button
 */
cartBtnToggle.addEventListener('click', function (event) {
  // Toggle cart visibility
  cart.classList.toggle('u-hidden');
});

/**
 * Click events for promo code button
 */
cartCodeAdd.addEventListener('click', function (event) {
  // If a code has not been applied yet, try to apply it
  if (document.querySelector('.js-product-summary-row-code') === null) {
    // Determine if the code is valid
    var isValidCode = CART_CODES.some(function (code) {
      return hasValue(code, "code", cartCodeUserInput.value);
    });

    // If valid, then apply it
    if (isValidCode) {
      for (var i = 0; i < CART_CODES.length; i++) {
        if (cartCodeUserInput.value === CART_CODES[i].code) {
          // Set values
          var cartCodeDiscount = CART_CODES[i].discount,
              cartCodeDiscountTotal = cartSubTotal * CART_CODES[i].discount;

          // Save active code data in an array
          cartActiveCode.push({ code: CART_CODES[i].code, discount: CART_CODES[i].discount });

          // Create the code HTML for the summary table
          var cartSummaryRowCodeHtml = document.createElement('tr'),
              cartSummaryRowCodeInnerHtml = '<td class="product-cart-summary-table-cell u-font-bold u-color-quaternary">Promo Code (' + cartCodeUserInput.value + '):</td><td class="product-cart-summary-table-cell u-text-right u-font-bold u-color-quaternary js-product-summary-row-code-amount">-' + CART_CURRENCY_SYMBOL + cartCodeDiscountTotal + ' (' + (cartCodeDiscount * 100) + '%)</td>';
          cartSummaryRowCodeHtml.className = 'product-cart-summary-code product-cart-summary-table-row js-product-summary-row-code';
          cartSummaryRowCodeHtml.innerHTML = cartSummaryRowCodeInnerHtml;

          // Append the code HTML to the document
          var cartSummaryRowSubtotal = document.querySelector('.js-product-summary-row-subtotal');
          insertAfter(cartSummaryRowCodeHtml, cartSummaryRowSubtotal);

          // Apply the code discount
          updateCartSummary();
        }
      }
    } else {
      // Otherwise alert the user of the invalid code
      alert('Sorry, the code you entered was not valid. Please try again.');
    }
  } else {
    // Otherwise a code has already been applied
    alert('You may only use one promotional code at a time.');
  }
});
