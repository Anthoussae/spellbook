"use strict";
import { renderHud } from "./renderHud";
import { getNumberFromElement } from "../util/getNumberFromElement";
import { tickNumber } from "../util/tickNumber";
import { tickPlayerHp } from "../util/tickPlayerHp";
import { characters } from "./render";

export function renderCombat(state) {
  console.log("state at renderCombat", state);
  console.log("rendering enemy", state.currentEnemy);
  console.log("rendering combat", state);
  console.log("enemy", state.currentEnemy);
  document.getElementById("combatBannerElement").innerHTML =
    state.currentEnemy.name;
  renderCombatHud(state);
  renderCharacters(state);
}

function renderCombatHud(state) {
  console.log("state at rendercombat hud", state);
  const combatHp = document.getElementById("combatHp");
  const combatShield = document.getElementById("combatShield");
  const enemyHp = document.getElementById("enemyHp");
  const enemyAttack = document.getElementById("enemyAttack");
  const ink = document.getElementById("ink-number");

  console.log("renderCombatHud");
  let currentHp = getNumberFromElement(combatHp); // Only the current HP value
  let currentShield = getNumberFromElement(combatShield);
  let currentEnemyHp = getNumberFromElement(enemyHp);
  let currentEnemyAttack = getNumberFromElement(enemyAttack);
  let currentInk = getNumberFromElement(ink);
  console.log("currentInk", currentInk);

  // Call the ticking function for player's current HP (with max HP displayed), shield, and enemy stats
  tickPlayerHp(combatHp, currentHp, state.hp, state.maxHp);
  tickNumber(combatShield, currentShield, state.shield, "Shield: ");
  tickNumber(enemyHp, currentEnemyHp, state.currentEnemy.hp, "HP: ");
  tickNumber(
    enemyAttack,
    currentEnemyAttack,
    state.currentEnemy.attack,
    "Attack: "
  );
  tickNumber(ink, currentInk, state.ink, "Ink: ");
}

function renderCharacters(state) {
  const player = document.getElementById("playerCombatDisplay");
  const enemy = document.getElementById("enemyCombatDisplay");

  let playerImage = characters["witch"];
  let enemyImage = characters[state.currentEnemy.imgName];
  //make the enemy green
  player.style.backgroundImage = `url(${playerImage})`;
  enemy.style.backgroundImage = `url(${enemyImage})`;
}
