export const cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  // Check if item is already in cart
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
      return;
    }
  });

  // Get quantity from user
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantitySelector.value);

  // Add item to cart or increase the quantity of an existed one
  if (!matchingItem) {
    cart.push({
      productId,
      quantity,
    });
  } else {
    matchingItem.quantity += quantity;
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  cart.forEach((cartItem, index) => {
    if (productId === cartItem.productId) {
      cart.splice(index, 1);
    }
  });

  saveToStorage();
}

export function calculateCartQuantity() {
  // Update cart quantity
  let cartQuantity = 0;
  cart.forEach((cartItem) => (cartQuantity += cartItem.quantity));
  return cartQuantity;
}
