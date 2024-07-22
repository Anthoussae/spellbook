"use strict";

export function renderHud(state) {
  let html = "";
  html += "HP: " + state.hp + "/" + state.maxHp + " ";
  html += "Gold: " + state.gold + " ";
  html += "Level: " + state.level + " ";
  // in final version add functionality so you can inspect deck by clicking on deck in hud
  html += "Deck: " + state.deck.length;
  document.querySelector("#hud").innerHTML = html;
}
