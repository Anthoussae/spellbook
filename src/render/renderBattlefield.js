"use strict";
import { castSpellbook } from "../state/combat/castSpellbook";
import { mulligan } from "../state/combat/mulligan";
import { renderButtons } from "./renderButtons";
import { renderHud } from "./renderHud";
import { playCard } from "../state/combat/playCard";

export function renderBattlefield(oldState) {
  //displays a button that says "fight". When pressed, it triggers the callback function.
  let state = { ...oldState };
  let html = "";
  //display state.currentEnemy.Hp and state.bunnies
  html += "<div>";
  html += `<h1 id='battleHud'>Enemy HP: ${state.currentEnemy.hp} Bunnies: ${state.bunnies} Ink: ${state.combatInk}</h1>`;

  //display spellbook
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
      html += "<div class='spell'>";
      html += `<h2 style='color: black font-size='3px''>${page.name}</h2>`;
      html += "</div>";
    }
  });
  html += "</div>"; // Close the spellbook-container div
  html += "</div>";

  //cast button
  html +=
    "<button id='cast-button' style='border: 3px solid green; color: darkgreen; background-color: lightgreen; font-size: 20px; text-align: center; padding: 20px;'>";
  html += `Cast Spellbook`;
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
    html += `<button class='handButton card'>${card.name}<br>${card.ink}</br></button>`; // Apply 'card' class for formatting
  });
  html += "</div>"; // Close the hand-container div
  html += "</div>"; // Close the hand div
  html += "</div>"; // Close the battlefield div
  //display
  document.querySelector("#output").innerHTML = html;
  //make the cast button clickable.
  //this may now require await or .then().
  document.querySelector("#cast-button").addEventListener("click", async () => {
    state = await castSpellbook(state);
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
