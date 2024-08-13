"use strict";
import { findObjectInArray } from "../util/findObjectInArray";

export function renderHud(state) {
  document.getElementById("deck").style.visibility = "visible";
  let html = "";
  html += "&#10084;: " + state.hp + "/" + state.maxHp + " ";
  html += "Gold: " + state.gold + " ";
  html += "Level: " + state.level + " ";
  html +=
    "Wand Power: " +
    findObjectInArray(state.relicBelt, "supertype", "wand").bunnyAdd +
    " ";
  html += "Bonus Bunnies: " + state.bonusBunnies + " ";
  // in final version add functionality so you can inspect deck by clicking on deck in hud
  const hudElement = document.querySelector("#hud");
  hudElement.innerHTML = html;
}
