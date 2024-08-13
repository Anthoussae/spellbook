"use strict";
import { sleep } from "../util/sleep";

//this code generates a bug in console, likely caused by trying to read "enemyName" from somewhere where it's not properly declared, or possibly relating to the asynchronicity.
export async function renderBattleHud(state) {
  let battleHud = document.querySelector("#battleHud");
  if (state.currentScreen == "combat") {
    let enemyName = state.currentEnemy.name.replace(/\s*\(\d+\)$/, "");
    battleHud.innerHTML = `<h1 id='battleHud'>${enemyName} HP: ${state.currentEnemy.hp} <p></p>Bunnies Summoned: ${state.bunnies} Ink: ${state.combatInk}</h1>`;
  } else if (state.currenScene != "combat") {
    battleHud.innerHTML = "";
  }
  await sleep(100);
}
