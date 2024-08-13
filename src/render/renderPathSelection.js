"use strict";
import { startCombat } from "../state/combat/startCombat";
import { startRest } from "../state/startRest";
import { startShop } from "../state/startShop";
import { startWandUpgrade } from "../state/startWandUpgrade";
import { renderHud } from "./renderHud";
import { renderRelicBelt } from "./renderRelicBelt";
import { renderTitle } from "./renderTitle";

export function renderPathSelection(oldState) {
  let state = { ...oldState };
  renderHud(state);
  renderRelicBelt(state);
  renderTitle(state);
  const options = state.presentedOptions;
  let html = `
  <div class="path-selection-container">
    <h1 class="path-selection-title">Choose a path</h1>
    <div class="path-selection">
`;
  for (const optionIndex in options) {
    const option = options[optionIndex];

    // Determine the class for the button based on the option name
    let buttonClass = "";
    if (option.name === "Rest") {
      buttonClass = "rest-button";
    } else if (option.name === "Shop") {
      buttonClass = "shop-button";
    } else if (option.name === "Wand Upgrade") {
      buttonClass = "wand-upgrade-button";
    } else {
      buttonClass = "other-button";
    }

    // Add the button with the corresponding class
    html += `<button class="${buttonClass}" data-index="${optionIndex}">${option.name}</button>`;
  }
  html += "</div>";
  const outputDiv = document.querySelector("#output");
  outputDiv.innerHTML = html;

  const btnElems = document.querySelectorAll("#output button");
  for (let btnElem of btnElems) {
    btnElem.addEventListener("click", () => {
      const name = btnElem.innerHTML;
      const clickedOption = options[btnElem.dataset.index];

      if (name === "Rest") {
        startRest(state);
      } else if (name === "Shop") {
        startShop(state);
      } else if (name === "Wand Upgrade") {
        startWandUpgrade(state);
      } else {
        state.currentEnemy = clickedOption;
        startCombat(state);
      }
    });
  }
}
