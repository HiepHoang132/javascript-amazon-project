export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

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
}
