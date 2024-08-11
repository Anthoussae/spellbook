"use strict";
import { render } from "./render";

// for some reason, card color isn't working correctly.

export function renderDeckExamine(state) {
  // let state = { ...oldState };
  let deck;
  if (state.currentScreen != "combat") {
    deck = state.deck;
  } else if (state.currentScreen == "combat") {
    deck = state.combatDeck;
  }
  state.previousScreen = state.currentScreen;
  state.currentScreen = "deckExamine";
  let html = `
  <div class="deck-examine">
      <div class="deck-examine__header">
          <h1>Deck Examine</h1>
      </div>
      <div class="deck-examine__cards">
          ${deck
            .map((card) => {
              // Check if card.color exists and set the style accordingly
              const textColorStyle = card.color
                ? `style="color: ${card.color};"`
                : "";
              return `
              <div class="deck-examine__card" data-effect="${card.effect}">
                  <div class="deck-examine__card-name" ${textColorStyle}>${card.name}</div>
                  <div class="deck-examine__card-tooltip">${card.effect}</div>
              </div>
              `;
            })
            .join("")}
      </div>
      <div class="deck-examine__footer">
          <button class="deck-examine__footer-button" id="resume-button">Resume Game</button>
      </div>
  </div>
`;
  document.getElementById("output").innerHTML = html;
  document.getElementById("deck").style.visibility = "hidden";
  document.getElementById("resume-button").addEventListener("click", () => {
    resumeGame(state);
  });
}

function resumeGame(state) {
  // let state = { ...oldState };
  document.getElementById("deck").style.visibility = "visible";
  state.currentScreen = state.previousScreen;
  state.previousScreen = null;
  render(state);
}
