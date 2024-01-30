import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";

export function renderPaymentSummary() {
  let totalPriceCent = 0;
  let shippingPriceCent = 0;
  let totalBeforeTax = 0;
  let estimatedTax = 0;
  let total = 0;
  let html = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const product = getProduct(productId);
    const deliveryOption = getDeliveryOption(productId, cartItem);

    totalPriceCent += product.priceCents * cartItem.quantity;
    shippingPriceCent += deliveryOption.priceCents;
    totalBeforeTax = totalPriceCent + shippingPriceCent;
    estimatedTax = totalBeforeTax * 0.1;
    total = totalBeforeTax + estimatedTax;
  });

  html += `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
      <div js-items>Items (3):</div>
      <div class="payment-summary-money">$${formatCurrency(
        totalPriceCent
      )}</div>
  </div>

  <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(
        shippingPriceCent
      )}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(
        totalBeforeTax
      )}</div>
  </div>

  <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
  </div>

  <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(total)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>

  `;

  document.querySelector(".js-payment-summary").innerHTML = html;
  renderPaymentSummary();
}
