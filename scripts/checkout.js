import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js"; // named export
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; // default export
import { deliveryOptions } from "../data/deliveryOptions.js";

let checkoutHTML = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const today = dayjs()
  let deliveryOption 
  deliveryOptions.forEach((option) => {
    if(option.id === cartItem.deliveryOptionId){
      deliveryOption = option
    }
  })
  
  const deliveryDate = today.add(deliveryOption.deliveryTime, 'days')
  const dateString = deliveryDate.format("dddd, MMMM D")

  checkoutHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${productId}">${
    cartItem.quantity
  }</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity" data-product-id = "${
                  matchingProduct.id
                }">
                Update
                </span>
                <input class="quantity-input js-quantity-input-${
                  matchingProduct.id
                }">
                <span class="save-quantity-link link-primary js-save-quantity" data-product-id = "${
                  matchingProduct.id
                }">Save</span>
                <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id = "${
                  matchingProduct.id
                }">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
                ${deliveryOptionHTML(matchingProduct, cartItem)}
            </div>
        </div>
    </div>
  `;
});

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-return-to-home-link").innerHTML = `
${cartQuantity} items
`;
}

function deliveryOptionHTML(matchingProduct, cartItem) {
  let html = "";
  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryTime, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    const priceString =
      option.priceCents === 0 ? "Free " : `$${option.priceCents / 100} - `;
    const isChecked = option.id === cartItem.deliveryOptionId;
    html += `
  <div class="delivery-option">
    <input type="radio" ${isChecked ? "checked" : ""} class="delivery-option-input"
    name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">
          ${dateString}
      </div>
      <div class="delivery-option-price">
          ${priceString} Shipping
      </div>
    </div>
  </div>
  `;
  });

  return html;
}

document.querySelector(".js-order-summary").innerHTML = checkoutHTML;
updateCartQuantity();
document.querySelectorAll(".js-delete-quantity").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
    updateCartQuantity();
  });
});

document.querySelectorAll(".js-update-quantity").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".js-save-quantity").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove("is-editing-quantity");

    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInput.value);

    if (newQuantity < 0 || newQuantity > 100) {
      alert("Not a valid quantity");
      return;
    }
    // Update cart item quantity
    updateQuantity(productId, newQuantity);

    // Update quantity on the page
    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = `${newQuantity}`;

    updateCartQuantity();
  });
});
