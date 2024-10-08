"use strict";

// Function to tick the player's HP with max HP displayed as static
export function tickPlayerHp(element, currentValue, targetValue, maxHp) {
  if (currentValue === targetValue) return;

  const increment = currentValue < targetValue ? 1 : -1;
  const color = increment > 0 ? "green" : "red"; // Set color based on change direction
  element.style.color = color; // Apply color when ticking

  function updateNumber() {
    currentValue += increment;
    element.innerHTML = "HP: " + currentValue + "/" + maxHp; // Display HP/MaxHP

    if (currentValue !== targetValue) {
      requestAnimationFrame(updateNumber);
    } else {
      element.style.color = ""; // Reset color when done
    }
  }

  requestAnimationFrame(updateNumber);
}
