"use strict";

//game state functions
import { applyReward } from "../state/applyReward";
import { rest } from "../state/startRest";
import { startCombat } from "../state/startCombat";
import { startPathSelection } from "../state/startPathSelection";

//render functions
import { renderHud } from "./renderHud";
import { renderRelicBelt } from "./renderRelicBelt";
import { renderBattlefield } from "./renderBattlefield";

export function render(state) {
  if (state.currentScreen == "pathSelection") {
    renderHud(state);
    renderRelicBelt(state);
    const options = state.presentedPathOptions;
    console.log(options);
    let html = "";
    for (const optionIndex in options) {
      const option = options[optionIndex];
      html += '<button data-index="' + optionIndex + '">';
      html += option.name;
      html += "</button>";
    }
    const outputDiv = document.querySelector("#output");
    outputDiv.innerHTML = html;

    const btnElems = document.querySelectorAll("#output button");
    for (let btnElem of btnElems) {
      btnElem.addEventListener("click", () => {
        const name = btnElem.innerHTML;
        alert("You clicked " + name);
        const option = options[btnElem.dataset.index];
        state.currentScreen = option.screen;
        if (state.currentScreen == "combat") {
          state.currentEnemy = option;
          startCombat(state);
        } else if (state.currentScreen == "rest") {
          rest();
        } else {
          throw "Unknown screen: " + state.currentScreen;
        }
      });
    }
  } else if (state.currentScreen == "rest") {
    //play animation for 3 seconds - ideally, fade to black, little fireplace crackling, big green +# hp heal visual, and the HP # ticks up visibly, then fade back to startPathSelection select.
    let html = "REST " + state.hp;
    const outputDiv = document.querySelector("#output");
    outputDiv.innerHTML = html;
    setTimeout(() => {
      startPathSelection(state);
    }, 3000);
  } else if (state.currentScreen == "combat") {
    renderBattlefield(state);
  } else if (state.currentScreen == "reward") {
    // const options = state.presentedRewardOptions;
    // let html = ''
    // for (const optionIndex in options) {
    //   const option = options[optionIndex];
    //   html += '<button data-index="'+optionIndex+'">'
    //   html +=   option.name
    //   html += '</button>'
    // }
    // const outputDiv = document.querySelector('#output')
    // outputDiv.innerHTML = html
    document.querySelector("#output").innerHTML = state.presentedRewardOptions
      .map(
        (option, optionIndex) =>
          '<button data-index="' +
          optionIndex +
          '">' +
          option.name +
          "</button>"
      )
      .join("");

    const btnElems = document.querySelectorAll("#output button");
    for (let btnElem of btnElems) {
      btnElem.addEventListener("click", () => {
        const name = btnElem.innerHTML;
        alert("You clicked " + name);
        const option = options[btnElem.dataset.index];
        //reward effect
        applyReward(option);
        renderHud(state);
        renderRelicBelt(state);
        startPathSelection(state);
      });
    }
  } else if (state.currentScreen === "deckExamine") {
    console.log("deckExamine");
  } else if (state.currentScreen === "deckService") {
    console.log("deckService");
  } else {
    throw "unknown screen" + state.currentScreen;
  }
}
