import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; // default export

export const deliveryOptions = [
  { id: "1", deliveryTime: 7, priceCents: 0 },
  { id: "2", deliveryTime: 3, priceCents: 499 },
  { id: "3", deliveryTime: 1, priceCents: 999 },
];

export function getDeliveryOption(productId, cartItem) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === cartItem.deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption;
}

function isWeekend(date) {
  const formattedDate = date.format("dddd");
  return !!(formattedDate === "Saturday" || formattedDate === "Sunday");
}

export function calculateDeliveryDate(deliveryOption) {
  let deliveryDate = dayjs();
  let remainingDays = deliveryOption.deliveryTime;

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, "days");
    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString;
}
