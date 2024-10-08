"use strict";

export function getNumberFromElement(element) {
  // Extract only the current HP before the "/"
  const innerText = element.innerHTML;

  if (innerText.includes("/")) {
    return parseInt(innerText.split("/")[0].replace(/\D/g, ""), 10); // Get the number before the "/"
  }

  return parseInt(innerText.replace(/\D/g, ""), 10); // For other elements without "/"
}
