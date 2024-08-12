"use strict";
import { sleep } from "../util/sleep";

export async function renderBattleHud(state) {
  let battleHud = document.querySelector("#battleHud");
  if (state.currentScreen == "combat") {
    battleHud.innerHTML = `<h1 id='battleHud'>Enemy HP: ${state.currentEnemy.hp} Bunnies: ${state.bunnies} Ink: ${state.combatInk}</h1>`;
  } else if (state.currenScene != "combat") {
    battleHud.innerHTML = "";
  }
  await sleep(100);
}
