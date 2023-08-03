// Get the necessary elements from the DOM
const cartIcon = document.getElementById('cart-icon');
const mainImage = document.querySelector('.main-image img');
const thumbnails = document.querySelectorAll('.thum-images img');
const previewImage = document.querySelector('.image-preview');
const mainPrevImage = document.getElementById('main-preview-image');
const productName = document.getElementById('prod-title');
const productAmount = document.getElementById('prod-amt');
const reduceButton = document.getElementById('reduce');
const increaseButton = document.getElementById('increase');
const quantityDisplay = document.querySelector('.qty small');
const cartIconAmount = document.querySelector('.acc-menu');
const addToCartButton = document.getElementById('cart-btn');
const mobileMenu = document.getElementById('ham-menu');
const closeMenu = document.getElementById('close-menu');

let cartOpen = false; // Variable to track if the cart is open or closed

// Function to remove the notification content if it exists
function removeNotificationContent() {
  const notificationContent = document.querySelector('.notification-content');
  if (notificationContent) {
    document.body.removeChild(notificationContent);
  }
}

// To handle the cart icon when clicked
cartIcon.addEventListener('click', () => {
  if (cartOpen) {
    // If the cart is open, close it by removing the notification content
    removeNotificationContent();
  } else {
    // If the cart is closed, open it by creating the notification content
    const notificationContent = document.createElement('div');
    notificationContent.classList.add('notification-content');

    // Cart Title
    const cartTitle = document.createElement('h2');
    cartTitle.textContent = 'Cart'; // Replace with the actual product title
    notificationContent.appendChild(cartTitle);

    // To handle When the cart is empty
    const cartEmpty = document.createElement('div');
    cartEmpty.classList.add('cart-empty');
    cartEmpty.style.display = 'none';
    notificationContent.appendChild(cartEmpty);

    const emptyCart = document.createElement('p');
    emptyCart.textContent = 'Your cart is empty.';
    cartEmpty.appendChild(emptyCart);

    // Notification Details
    const notificationDetails = document.createElement('div');
    notificationDetails.classList.add('notification-details');
    notificationContent.appendChild(notificationDetails);

    // Product Image
    const productImage = document.createElement('img');
    productImage.src = './images/image-product-1-thumbnail.jpg';
    productImage.alt = 'Product Image';
    notificationDetails.appendChild(productImage);

    // Notification Product Details
    const notificationProdDet = document.createElement('div');
    notificationProdDet.classList.add('not-prod-det');
    notificationDetails.appendChild(notificationProdDet);

    // Product Title
    const productTitle = document.createElement('p');
    productTitle.textContent = productName.textContent;
    notificationProdDet.appendChild(productTitle);

    // Product Quantity and Pricing
    const notificationPricing = document.createElement('div');
    notificationPricing.classList.add('not-price');
    notificationProdDet.appendChild(notificationPricing);

    // Product Price
    const productPrice = document.createElement('p');
    productPrice.textContent = productAmount.textContent;
    notificationPricing.appendChild(productPrice);

    // Product Quantity
    const productQuantity = document.createElement('p');
    productQuantity.textContent = 'x ' + quantityDisplay.textContent;
    notificationPricing.appendChild(productQuantity);

    // Total Amount
    const totalAmount = document.createElement('strong');
    totalAmount.textContent = '$' + (parseInt(productPrice.textContent) * parseInt(quantityDisplay.textContent));
    notificationPricing.appendChild(totalAmount);

    // Delete Icon
    const deleteIcon = document.createElement('img');
    deleteIcon.src = './images/icon-delete.svg';
    deleteIcon.alt = 'Delete Icon';
    deleteIcon.addEventListener('click', () => {
      notificationDetails.style.display = 'none';
      checkoutButton.style.display = 'none';

      if (notificationDetails.style.display === 'none') {
        cartEmpty.style.display = 'flex';
      } else {
        notificationDetails.style.display = 'block';
        cartEmpty.style.display = 'none';
      }
    });
    notificationDetails.appendChild(deleteIcon);

    // Checkout Button
    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Checkout';
    checkoutButton.addEventListener('click', () => {
      notificationContent.style.display = 'none';
      quantityDisplay.textContent = '0';
    });
    notificationContent.appendChild(checkoutButton);

    // Appending the Notification Content to the HTML body
    document.body.appendChild(notificationContent);
  }

  // Toggle the cart state
  cartOpen = !cartOpen;
});

// To handle when the add to cart button is clicked and the quantity on the cart pops up on top of cart icon
addToCartButton.addEventListener('click', () => {
  const cartQuantity = document.createElement('small');
  cartQuantity.classList.add('cart-qty');

  let quantity = parseInt(quantityDisplay.textContent);
  cartQuantity.textContent = parseInt(quantityDisplay.textContent);
  if (quantity > 0) {
    cartQuantity.style.display = 'block';
  } else {
    cartQuantity.style.display = 'none';
  }

  cartIconAmount.appendChild(cartQuantity);
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

// To handle the main image and thumbnails preview
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    mainImage.src = thumbnail.src;
    mainPrevImage.src = thumbnail.src; // Update the preview image as well

    // Remove the active-thumbnail class from all thumbnails
    thumbnails.forEach((thumb) => thumb.classList.remove('active-thumbnail'));

    // Add the active-thumbnail class to the clicked thumbnail
    thumbnail.classList.add('active-thumbnail');

    // Update the current image index for preview
    currentImageIndex = index;
  });
});

// Function to handle the image preview
function handleImagePreview() {
  mainImage.addEventListener('click', () => {
    previewImage.style.display = 'flex';
  });

  const prevImgPreview = document.getElementById('prev-img-preview');
  const nextImgPreview = document.getElementById('next-img-preview');
  const closePreview = document.getElementById('close');

  let currentImageIndex = 0; // Initialize the current image index for preview

  prevImgPreview.addEventListener('click', () => {
    // Change the preview image to the previous thumbnail image
    currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
    mainPrevImage.src = thumbnails[currentImageIndex].src;
  });

  nextImgPreview.addEventListener('click', () => {
    // Change the preview image to the next thumbnail image
    currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
    mainPrevImage.src = thumbnails[currentImageIndex].src;
  });

  closePreview.addEventListener('click', () => {
    // Close the preview image
    previewImage.style.display = 'none';
    removeNotificationContent();
  });
}

// Function to handle quantity increment and decrement
function handleQuantity() {
  let quantity = 0;

  function updateQuantityDisplay() {
    quantityDisplay.textContent = quantity;
  }

  updateQuantityDisplay();

  reduceButton.addEventListener('click', () => {
    if (quantity > 0) {
      quantity--;
      updateQuantityDisplay();
    }
  });

  increaseButton.addEventListener('click', () => {
    quantity++;
    updateQuantityDisplay();
  });
}

// Function to handle the mobile menu
function handleMobileMenu() {
  mobileMenu.addEventListener('click', () => {
    const navMobileMenu = document.querySelector('.menu');
    navMobileMenu.style.display = 'grid';
  
    document.getElementById('close-menu').addEventListener('click', () => {
      navMobileMenu.style.display = 'none';
    })
  
  })
}

// Call the functions to set up event handlers
handleImagePreview();
handleQuantity();
handleMobileMenu();
