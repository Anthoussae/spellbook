"use strict";
import { renderDeckExamine } from "./renderDeckExamine";

export function renderButtons(state) {
  const deckButton = document.getElementById("deck");
  if (state.currentScreen != "combat") {
    let html = deckButton.innerHTML;
    deckButton.innerHTML = "Deck: (" + state.deck.length + ")";
    if (deckButton) {
      deckButton.addEventListener("click", () => {
        if (state) {
          renderDeckExamine(state);
        } else {
          console.error("State is not defined yet.");
        }
      });
    } else {
      console.error("Deck button not found.");
    }
  } else if (state.currentScreen == "combat") {
    let html = deckButton.innerHTML;
    deckButton.innerHTML = "Remaining Deck: (" + state.combatDeck.length + ")";
    if (deckButton) {
      deckButton.addEventListener("click", () => {
        if (state) {
          renderDeckExamine(state);
        } else {
          console.error("State is not defined yet.");
        }
      });
    }
  }
}
