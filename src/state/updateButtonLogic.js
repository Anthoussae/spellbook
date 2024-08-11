"use strict";
import { renderDeckExamine } from "../render/renderDeckExamine";

export function updateButtonLogic(state) {
  console.log("button logic state 1st options", state.presentedOptions[0]);
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".deck-examine__card");

    cards.forEach((card) => {
      card.addEventListener("mouseover", () => {
        const tooltip = card.querySelector(".deck-examine__card-tooltip");
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = 1;
      });

      card.addEventListener("mouseout", () => {
        const tooltip = card.querySelector(".deck-examine__card-tooltip");
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = 0;
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const deckButton = document.getElementById("deck");
    if (deckButton) {
      deckButton.addEventListener("click", () => {
        if (state) {
          console.log("top option at resumption", state.presentedOptions[0]);
          renderDeckExamine(state);
        } else {
          console.error("State is not defined yet.");
        }
      });
    } else {
      console.error("Deck button not found.");
    }
  });
}
