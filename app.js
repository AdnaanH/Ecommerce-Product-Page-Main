// Get the necessary elements from the DOM
const cartIcon = document.getElementById('cart-icon');
const notificationPopup = document.getElementById('notification-popup');
const mainImage = document.querySelector('.main-image img');
const thumbnails = document.querySelectorAll('.thum-images img');
const productName = document.getElementById('prod-title');
const productAmount = document.getElementById('prod-amt');
const reduceButton = document.getElementById('reduce');
const increaseButton = document.getElementById('increase');
const quantityDisplay = document.querySelector('.qty small');
const addToCartButton = document.getElementById('cart-btn');
const accountMenu = document.querySelector('acc-menu');

let cartQuantity = 0;

//To handle the cart icon when clicked
cartIcon.addEventListener('click', () => {
  console.log("I am Big BOSS");
  const notificationContent = document.createElement('div');
  notificationContent.classList.add('notification-content');

  // Cart Title
  const cartTitle = document.createElement('h2');
  cartTitle.textContent = 'Cart'; // Replace with the actual product title
  notificationContent.appendChild(cartTitle);

  // Notification Details
  const notificationDetails = document.createElement('div');
  notificationDetails.classList.add('notification-details');
  notificationContent.appendChild(notificationDetails);

  // Product Image
  const productImage = document.createElement('img');
  productImage.src = './images/image-product-1-thumbnail.jpg'; 
  productImage.alt = 'Product Image';
  notificationDetails.appendChild(productImage);

  //Notification Product Details
  const notificationProdDet = document.createElement('div')
  notificationProdDet.classList.add('not-prod-det');
  notificationDetails.appendChild(notificationProdDet);

  // Product Title
  const productTitle = document.createElement('p');
  productTitle.textContent = productName.textContent;
  notificationProdDet.appendChild(productTitle);

  // Product Quantity and Pricing
  const notificationPricing = document.createElement('div');
  notificationPricing.classList.add('not-price');
  notificationDetails.appendChild(notificationPricing);

  // Product Price
  const productPrice = document.createElement('p');
  productPrice.textContent = productAmount.textContent; 
  notificationPricing.appendChild(productPrice);

  // Product Quantity
  const productQuantity = document.createElement('p');
  productQuantity.textContent = "x " + quantityDisplay.textContent; 
  notificationPricing.appendChild(productQuantity);

  // Total Amount
  const totalAmount = document.createElement('strong');
  totalAmount.textContent = "$" + parseInt(productPrice.textContent) * parseInt(quantityDisplay.textContent); 
  notificationPricing.appendChild(totalAmount);

  // Delete Icon
  const deleteIcon = document.createElement('img');
  deleteIcon.src = './images/icon-delete.svg';
  deleteIcon.alt = 'Delete Icon';
  notificationDetails.appendChild(deleteIcon);

  // Checkout Button
  const checkoutButton = document.createElement('button');
  checkoutButton.textContent = 'Checkout';
  checkoutButton.addEventListener('click', () => {
    notificationDetails.style.display = 'none';
  })
  notificationContent.appendChild(checkoutButton);


  // Appending the Notification Content to the HTML body
  document.body.appendChild(notificationContent);
});


//To handle when the add to cart button is clicked
addToCartButton.addEventListener('click', () => {
  const numProds = document.createElement('span');
  numProds.textContent = quantityDisplay.textContent;

  document.accountMenu.appendChild(numProds);

})

// Function to update the cart quantity and display it on the cart icon
function updateCartQuantity() {
  cartQuantity += parseInt(quantityDisplay.textContent);
  cartIcon.textContent = cartQuantity;
}


// Click event listeners for the thumbnail images
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', () => {
    mainImage.src = thumbnail.src;
  });
});

// To handle the decrease icon when clicked
reduceButton.addEventListener('click', () => {
  let quantity = parseInt(quantityDisplay.textContent);
  if (quantity > 0) {
    quantity--;
    quantityDisplay.textContent = quantity;
  }
});

// To handle the increase icon when clicked
increaseButton.addEventListener('click', () => {
  let quantity = parseInt(quantityDisplay.textContent);
  quantity++;
  quantityDisplay.textContent = quantity;
});

