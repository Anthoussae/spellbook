"use strict";
import { showScreen, resumeGame } from "./render";
import { renderHud } from "./renderHud";
import { renderCard } from "./renderCard";

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
  const resumeClick = () => {
    resumeGame(state);
    resumeButton.removeEventListener("click", resumeClick);
  };
  resumeButton.addEventListener("click", resumeClick, { once: true });
}
