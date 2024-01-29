export let cart = JSON.parse(localStorage.getItem("cart")) || [];

// if (!cart) {
//   cart = [
//     {
//       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//       quantity: 2,
//       deliveryOptionId: "1",
//     },
//     {
//       productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//       quantity: 1,
//       deliveryOptionId: "2",
//     },
//   ];
// }

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  // Check if item is already in cart
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
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
      deliveryOptionId: "1"
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

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
