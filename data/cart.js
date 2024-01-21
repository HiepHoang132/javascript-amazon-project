export const cart = [];

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
  