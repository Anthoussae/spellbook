"use strict";
export function publishMessage(text) {
  const messageElement = document.createElement("div");
  messageElement.innerText = text;
  messageElement.style.position = "absolute";
  messageElement.style.top = "50%";
  messageElement.style.left = "50%";
  messageElement.style.transform = "translate(-50%, -50%)"; // Center the element
  messageElement.style.padding = "20px";
  messageElement.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  messageElement.style.color = "white";
  messageElement.style.fontSize = "2rem";
  messageElement.style.borderRadius = "10px";
  messageElement.style.zIndex = "1000"; // Ensure it appears above other elements
  messageElement.style.textAlign = "center";
  messageElement.style.opacity = "1";
  document.body.appendChild(messageElement);

  // Fade out and remove the message after 2 seconds
  setTimeout(() => {
    messageElement.style.transition = "opacity 0.5s ease";
    messageElement.style.opacity = "0";

    // Remove the message element after the fade-out transition
    setTimeout(() => {
      messageElement.remove();
    }, 500);
  }, 2000); // Keep the message visible for 2 seconds
}
