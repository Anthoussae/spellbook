"use strict";
import { renderCard } from "./renderCard";

export function renderCardDraw(drawnCard) {
  const cardHtml = renderCard(drawnCard, "hand"); // Render the card HTML
  const handDiv = document.getElementById("combatHand");
  const deckDiv = document.getElementById("deckElement");

  // Create a card element and add it to the deckDiv temporarily
  const cardElement = document.createElement("div");
  cardElement.innerHTML = cardHtml;
  console.log("cardElement:", cardElement);
  deckDiv.appendChild(cardElement);

  // Calculate card positions based on the number of cards in hand
  const currentCards = handDiv.getElementsByClassName("card").length;
  const cardWidth = 181; // Width of each card in px
  const cardSpacing = 30; // Spacing between cards in px
  const maxSpacedCardsInHand = 4;
  const offsetX = cardWidth + cardSpacing; // Total width a card takes with spacing

  let finalLeft = 0;

  if (currentCards < maxSpacedCardsInHand) {
    // Calculate position based on current cards in hand
    finalLeft =
      handDiv.offsetWidth / 2 -
      (currentCards * offsetX) / 2 +
      currentCards * offsetX;
  } else {
    // Stack cards, offsetting the visible portion slightly
    finalLeft =
      handDiv.offsetWidth / 2 -
      (maxSpacedCardsInHand * offsetX) / 2 +
      (maxSpacedCardsInHand - 1) * offsetX;
    // Apply stacking behavior by reducing the offset for previous cards
    cardElement.style.zIndex = currentCards + 1; // Ensure the newest card is on top
  }

  // Move card from deck to hand with animation
  const rect = deckDiv.getBoundingClientRect(); // Starting position
  const handRect = handDiv.getBoundingClientRect(); // Target position

  cardElement.style.position = "absolute";
  cardElement.style.left = `${rect.left}px`;
  cardElement.style.top = `${rect.top}px`;
  cardElement.style.transition = "all 0.25s ease";

  // Append the card to the handDiv after positioning it absolutely
  setTimeout(() => {
    handDiv.appendChild(cardElement);

    // Move card to its final position
    cardElement.style.left = `${handRect.left + finalLeft}px`;
    cardElement.style.top = `${handRect.top}px`;
  }, 10); // Delay to allow for transition

  console.log("Rendering card draw:", drawnCard);
}
