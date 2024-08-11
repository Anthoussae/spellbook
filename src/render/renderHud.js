"use strict";
import { findObjectInArray } from "../util/findObjectInArray";
import { animateMultipleNumbers } from "./animateMultipleNumbers";

export function renderHud(state) {
  document.getElementById("deck").style.visibility = "visible";
  let html = "";
  html += "HP: " + state.hp + "/" + state.maxHp + " ";
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

// nonfunctional code, as far as I can tell.

// export function renderHud(state) {
//   document.getElementById("deck").style.visibility = "visible";

//   // Get the current text content of the HUD
//   const hudElement = document.querySelector("#hud");
//   const previousTextContent = hudElement.textContent;

//   // Construct the new HTML content
//   let html = "";
//   html += "HP: " + state.hp + "/" + state.maxHp + " ";
//   html += "Gold: " + state.gold + " ";
//   html += "Level: " + state.level + " ";
//   html +=
//     "Wand Power: " +
//     findObjectInArray(state.relicBelt, "supertype", "wand").bunnyAdd +
//     " ";
//   html += "Bonus Bunnies: " + state.bonusBunnies + " ";

//   // Update the HUD with the new HTML
//   hudElement.innerHTML = html;

//   // Extract the current values from the previous text content
//   const previousValues = previousTextContent.match(/\d+/g) || [];

//   // New values to animate to
//   const newValues = [
//     state.hp,
//     state.gold,
//     state.level,
//     findObjectInArray(state.relicBelt, "supertype", "wand").bunnyAdd,
//     state.bonusBunnies,
//   ];

//   // If there are previous values, animate the transition
//   if (previousValues.length) {
//     const numericPreviousValues = previousValues.map(Number);
//     animateMultipleNumbers("hud", newValues);
//   } else {
//     // If no previous values exist, just update immediately
//     hudElement.innerHTML = html;
//   }
// }
