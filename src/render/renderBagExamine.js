"use strict";
import { relicImages, showScreen } from "./render";
import { resumeGame } from "./render";
import { renderHud } from "./renderHud";
import { renderRelic } from "./renderRelic";

export function renderBagExamine(state) {
  let bag = state.relicBelt;

  let outputDiv = document.getElementById("bagExamineOutput");
  // document.getElementById("blueCarpetBackground").style.display = "block";

  let html = "";
  bag.forEach((relic, index) => {
    let imagePath = relicImages[relic.imgName];
    html += renderRelic(
      imagePath,
      relic.name,
      index,
      relic.effect,
      relic.supertype,
      relic.bunnyAdd,
      relic.rarity,
      "bag"
    );
  });

  outputDiv.innerHTML = html;

  if (!["bagExamine", "deckExamine"].includes(state.currentScreen)) {
    state.previousScreen = state.currentScreen;
  }

  state.currentScreen = "bagExamine";
  console.log("bag examine", state.currentScreen);
  renderHud(state);
  showScreen(state.currentScreen); // Display the correct screen
  const resumeButton = document.getElementById("bag-resume-button");
  // Clear any existing listener, referencing the named function directly
  const resumeClick = () => {
    resumeGame(state);
    resumeButton.removeEventListener("click", resumeClick);
  };
  resumeButton.addEventListener("click", resumeClick, { once: true });
}
