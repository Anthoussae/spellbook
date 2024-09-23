"use strict";
import { showScreen, resumeGame } from "./render";
import { renderHud } from "./renderHud";

export function renderDeckExamine(state) {
  const deck = state.currentScreen === "combat" ? state.combatDeck : state.deck;
  const output = document.getElementById("deckExamineOutput");

  // Only update previousScreen if not already in deckExamine or bagExamine
  if (!["bagExamine", "deckExamine"].includes(state.currentScreen)) {
    state.previousScreen = state.currentScreen;
  }

  // Toggle between deckExamine and bagExamine without overwriting previous screen
  if (
    state.currentScreen === "deckExamine" &&
    state.previousScreen === "bagExamine"
  ) {
    state.previousScreen = "bagExamine";
  }

  // Display deck
  let html = "";
  deck.forEach((card, index) => {
    html += renderCard(card, index);
  });
  output.innerHTML = html;

  state.currentScreen = "deckExamine";
  renderHud(state);
  showScreen(state.currentScreen); // Ensure this displays the correct UI

  const resumeButton = document.getElementById("deck-resume-button");

  // Clear any existing listener, referencing the named function directly
  const resumeClick = () => resumeGame(state);

  resumeButton.removeEventListener("click", resumeClick);
  resumeButton.addEventListener("click", resumeClick, { once: true });
}
function renderCard(card, index) {
  return `
    <div class="card" style="display: inline-block; width: 18%; margin: 1%; text-align: center; position: relative;">
      <img src="${card.imgName}" alt="${card.name}" style="width: 100%; border-radius: 8px;">
      <div class="tooltip" style="visibility: hidden; background-color: #333; color: #fff; text-align: center; border-radius: 6px; padding: 5px; position: absolute; z-index: 1; bottom: 100%; left: 50%; transform: translateX(-50%); white-space: nowrap;">
        ${card.effect}
      </div>
    </div>
  `;
}
