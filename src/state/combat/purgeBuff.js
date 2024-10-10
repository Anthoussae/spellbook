"use strict";
import { pickN } from "../../util/pickN";
import { drawCard } from "./drawXCards";
import { renderCombat } from "../../render/renderCombat";
export function purgeBuff(oldState) {
  let state = { ...oldState };
  let enemy = state.currentEnemy;
  if (enemy.buffs) {
    if (enemy.buffs.length > 0) {
      let buffs = enemy.buffs;

      // Randomly pick a buff from the buffs array
      let selectedBuff = pickN(buffs, 1);
      selectedBuff = selectedBuff[0];

      // Remove selected buff from buffs
      let index = buffs.indexOf(selectedBuff);
      let buffsDiv = document.getElementById("enemyBuffDisplay");
      let buffDiv = buffsDiv.children[index]; // Fix buffDiv selection

      // Play the purge animation
      renderPurge(buffDiv);

      buffs.splice(index, 1);

      // Apply the effects of removing the selected buff
      if (selectedBuff.name === "Heart" || selectedBuff.name === "Shield") {
        enemy.hp = enemy.hp - Math.floor(selectedBuff.storedValue);
      }
      if (selectedBuff.name === "Poison") {
        state.combatHandSize = state.combatHandSize - selectedBuff.handSizeAdd;
        state = drawCard(state);
      }
      if (selectedBuff.name === "Burden") {
        state.combatInk = state.combatInk - selectedBuff.inkAdd;
      }
      if (selectedBuff.name === "Curse") {
        state.combatPages = state.combatPages - selectedBuff.pageAdd;
      }
      if (selectedBuff.name === "Weaken") {
        state.bunnies = state.bunnies + selectedBuff.storedValue;
      }
      if (selectedBuff.name === "Empowered") {
        enemy.attack = enemy.attack - selectedBuff.storedValue;
      }

      renderCombat(state);
      return state;
    }
  } else {
    return state;
  }
}

//experimental
export function renderPurge(buffDiv) {
  console.log("puffing purge");
  if (!buffDiv) return; // Ensure there's a valid buffDiv
  console.log("puffing purge");
  const puffDiv = document.createElement("div");
  puffDiv.classList.add("puff");

  // Position the puff exactly where the buff was
  const rect = buffDiv.getBoundingClientRect();
  puffDiv.style.left = `${rect.left}px`;
  puffDiv.style.top = `${rect.top}px`;

  // Append the puff div to the body or the buffDisplay container
  document.body.appendChild(puffDiv);

  // Remove the puff div after the animation ends
  puffDiv.addEventListener("animationend", () => {
    puffDiv.remove();
  });
}
