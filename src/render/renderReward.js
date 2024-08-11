"use strict";
import { applyReward } from "../state/applyReward";
import { startPathSelection } from "../state/startPathSelection";
import { renderHud } from "./renderHud";
import { renderRelicBelt } from "./renderRelicBelt";

export function renderReward(state) {
  const options = state.presentedOptions;
  // Create the buttons for the rewards
  // Create the buttons for the rewards with the reward-button class
  let html = "";
  html += `<h1 class="reward-selection-title">Choose a reward:</h1>`;
  state.presentedOptions.forEach((option, optionIndex) => {
    html += `<button class="reward-button" data-index="${optionIndex}">${option.name}</button>`;
  });

  // Insert the buttons into the output container
  const outputDiv = document.querySelector("#output");
  outputDiv.innerHTML = html;

  // Add event listeners to the buttons
  const btnElems = document.querySelectorAll("#output .reward-button");
  btnElems.forEach((btnElem) => {
    btnElem.addEventListener("click", () => {
      const option = state.presentedOptions[btnElem.dataset.index];
      state.selectedReward = option;
      state = applyReward(state);
      renderHud(state);
      renderRelicBelt(state);
      startPathSelection(state);
    });
  });
}
