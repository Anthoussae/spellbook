"use strict";
import { renderCard } from "./renderCard";
import { playCard } from "../state/combat/playCard";

export function renderCardDraw(drawnCard, state) {
  let cardHtml = renderCard(drawnCard, "hand"); // Render the card HTML

  const handDiv = document.getElementById("combatHand");
  const deckDiv = document.getElementById("deckElement");

  // Create a card element and add it to the deckDiv temporarily
  const cardElement = document.createElement("div");
  cardElement.classList.add("cardContainer");

  cardElement.innerHTML = cardHtml;
  handDiv.appendChild(cardElement);

  // updateCardRotations(state);

  //this may be bugged: Does it register the state at the time of drawing the card, or the state upon clicking it?
  cardElement.addEventListener("click", () => {
    state = playCard(state, drawnCard, cardElement);
    //remove the card from the hand
    // cardElement.remove();
  });
}

//bugged for even numbers
//bugged when playing cards
function updateCardRotations(state) {
  const handDiv = document.getElementById("combatHand");
  const cardsInHand = handDiv.getElementsByClassName("cardContainer");

  let totalCards = state.hand.length;
  let middleIndex = 0;

  if (totalCards % 2 != 0) {
    middleIndex = Math.floor((totalCards - 1) / 2); // Adjusted for zero-based index
    console.log("middleIndex", middleIndex);
  } else {
    middleIndex = (totalCards - 1) / 2; // Adjusted for zero-based index
    console.log("middleIndex", middleIndex);
  }

  // Constants for visual adjustments
  const maxVerticalShift = 20; // Maximum pixels to lower/raise cards
  const rotationFactor = 5; // Degrees of rotation

  // Loop through each card and apply both rotation and vertical adjustment
  for (let i = 0; i < cardsInHand.length; i++) {
    let rotation = (i - middleIndex) * rotationFactor;

    // Calculate vertical shift: closer to middle = higher (positive values raise, negative lower)
    let verticalShift = Math.abs(i - middleIndex) * maxVerticalShift; // Cards farther from the middle go lower

    console.log(
      "rotating",
      i,
      "by",
      rotation,
      "degrees and shifting by",
      verticalShift,
      "pixels"
    );
    // Apply rotation and vertical shift
    cardsInHand[i].style.transform = "";

    cardsInHand[
      i
    ].style.transform = `rotate(${rotation}deg) translateY(${verticalShift}px)`;
  }
}
