"use strict";
import { castSpellbook } from "../state/combat/castSpellbook";
import { mulligan } from "../state/combat/mulligan";
import { renderButtons } from "./renderButtons";
import { renderHud } from "./renderHud";
import { playCard } from "../state/combat/playCard";
import { renderBattleHud } from "./renderBattleHud";

export function renderBattlefield(oldState) {
  //displays a button that says "fight". When pressed, it triggers the callback function.
  let state = { ...oldState };

  //display state.currentEnemy.Hp and state.bunnies
  renderBattleHud(state);

  //display spellbook
  let html = "";
  html += "<div>";
  html += "<div class='combat screen'>";
  html += `<h1>Spellbook:</h1>`;
  html += "<div class='spellbook-container'>"; // Container for the pages
  state.spellbook.forEach((page) => {
    if (page === "page") {
      html += "<div class='page'>"; // Page div
      html += `<h2 style='color: grey'>Page</h2>`;
      html += "</div>";
    } else {
      console.log(page);
      html += `<div class='spell' data-effect="${page.effect}">`; // Add data-effect attribute
      html += `<h2 style='color: white; font-size='3px'>${page.name}</h2>`;
      html += "</div>";
    }
  });
  html += "</div>"; // Close the spellbook-container div
  html += "</div>";

  //cast button
  html +=
    "<button id='cast-button' style='border: 3px solid green; color: darkgreen; background-color: lightgreen; font-size: 20px; text-align: center; padding: 20px;'>";
  html += `Cast: ${state.castBunnies}`;
  html += "</button>";

  // Mulligan button
  // Determine if the button should be disabled
  const isDisabled = state.combatMulligans === 0;
  html += `<button id='mulligan-button' 
               style='border: 3px ${isDisabled ? "grey" : "darkred"}; 
                      color: ${isDisabled ? "grey" : "darkred"}; 
                      background-color: ${isDisabled ? "#d3d3d3" : "pink"}; 
                      font-size: 20px; 
                      text-align: center; 
                      padding: 20px;' 
               ${isDisabled ? "disabled" : ""}>
            Mulligan (${state.combatMulligans})
         </button>`;

  //hand
  html += "<div class='hand'>";
  html += `<h1>Hand:</h1>`;
  html += "<div class='hand-container'>"; // Container for hand cards
  state.hand.forEach((card) => {
    html += `
    <button class='handButton card'>
      ${card.name}<br>${card.ink}</br>
      <span class='tooltip'>${card.effect}</span>
    </button>
  `; // Apply 'card' class for formatting
  });
  html += "</div>"; // Close the hand-container div
  html += "</div>"; // Close the hand div
  html += "</div>"; // Close the battlefield div
  //display
  document.querySelector("#output").innerHTML = html;
  //make the cast button clickable.
  //this may now require await or .then().
  document.querySelector("#cast-button").addEventListener("click", async () => {
    state.casting = state.casting + 1;
    if (state.casting === 1) {
      state = await castSpellbook(state);
    }
    // Optionally, you can add any additional logic here that needs to happen after casting the spellbook
  });
  //make the mulligan button clickable
  document.querySelector("#mulligan-button").addEventListener("click", () => {
    state = mulligan(state);
  });
  //make the hand buttons clickable.
  document.querySelectorAll(".handButton").forEach((button, index) => {
    button.addEventListener("click", () => {
      playCard(state, state.hand[index]);
    });
  });
  renderButtons(state);
  renderHud(state);
}