"use strict";
import { socketCardWithGem } from "../state/socketCardWithGem";
import { renderButtons } from "./renderButtons";

export function renderSocketing(oldState) {
  document.getElementById("deck").style.visibility = "hidden";
  let state = { ...oldState };
  renderButtons(state);

  state.previousScreen = state.currentScreen;
  state.currentScreen = "socketing";

  let allGemNames = state.gemPool.map((gem) => gem.name);
  let unsocketedDeck = state.deck
    .filter((card) => {
      return !allGemNames.some((gemName) => card.name.includes(gemName));
    })
    .filter((card) => {
      return !card.trigger.includes("instant");
    });
  let gem = state.selectedReward;
  //draw buttons for each unsocketed card

  if (unsocketedDeck.length > 0 || gem.name == "Onyx") {
    let html = `
    <div class="socketing">
        <div class="socketing__header">
            <h1 style="color: ${gem.color}">Socketing ${gem.name}</h1>
            <div class="socketing__buttons">
            ${unsocketedDeck
              .map((card) => {
                return `
                <button class='socketing__button' id='socketing__button'>${card.name}</button>`;
              })
              .join("")}
            </div>
        </div>
    </div>
    `;
    document.getElementById("output").innerHTML = html;

    // Assign a click event to each button
    let socketingButtons = document.querySelectorAll(".socketing__button");
    for (let button of socketingButtons) {
      button.addEventListener("click", () => {
        let cardName = button.innerHTML;
        let selectedCard = unsocketedDeck.find((card) => card.name == cardName);
        state.selectedCard = selectedCard;
        socketCardWithGem(state);
      });
    }
  } else {
    // draw a cancel button "no usocketed cards available!"
    let html = `
      <div class="socketing">
          <div class="socketing__header">
              <h1>Socketing</h1>
                  <div class="socketing">
                  <button class='socketing__button' id='socketing__button'>No unsocketed cards available!</button>
                  </div>
          </div>
      </div>
      `;
    document.getElementById("output").innerHTML = html;

    //may be bugged
    let socketingButton = document.querySelector(".socketing__button");
    socketingButton.addEventListener("click", () => {
      state.currentScreen = state.previousScreen;
      document.getElementById("deck").style.visibility = "visible";
      render(state);
    });
  }
  document.getElementById("deck").style.visibility = "visible";
}
