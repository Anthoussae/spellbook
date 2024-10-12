"use strict";

// Function to tick other values up or down with color change
export function tickNumber(element, currentValue, targetValue, label) {
  if (currentValue === targetValue) {
    element.innerHTML = label + currentValue;
    return;
  }

  const increment = currentValue < targetValue ? 1 : -1;
  const color = increment > 0 ? "green" : "red"; // Set color based on change direction
  element.style.color = color; // Apply color when ticking

  function updateNumber() {
    currentValue += increment;
    element.innerHTML = label + currentValue;

    if (currentValue !== targetValue) {
      requestAnimationFrame(updateNumber);
    } else {
      element.style.color = ""; // Reset color when done
    }
  }
  requestAnimationFrame(updateNumber);
  console.log("currentValue", currentValue, "targetValue", targetValue);
}
