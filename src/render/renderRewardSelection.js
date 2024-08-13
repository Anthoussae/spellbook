"use strict";
import { applyReward } from "../state/applyReward";
import { startPathSelection } from "../state/startPathSelection";
import { renderHud } from "./renderHud";
import { renderRelicBelt } from "./renderRelicBelt";

export function renderRewardSelection(oldState) {
  let state = { ...oldState };
  renderHud(state);
  //reveal the deck button again
  document.getElementById("deck").style.display = "block";

  let html = "";
  const options = state.presentedOptions;
  const outputDiv = document.querySelector("#output");

  html += `<h1 class="reward-selection-title">Upgrade your deck:</h1>`;
  options.forEach((option, optionIndex) => {
    html += `<button class="reward-button" data-index="${optionIndex}">${option.name}</button>`;
  });

  // Insert the buttons into the output container
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
