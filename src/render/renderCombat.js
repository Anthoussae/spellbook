"use strict";
import { renderHud } from "./renderHud";
import { getNumberFromElement } from "../util/getNumberFromElement";
import { tickNumber } from "../util/tickNumber";
import { tickPlayerHp } from "../util/tickPlayerHp";
import { characters } from "./render";
import { buffs } from "./render";
import { displayElementImages } from "./render";
import { spellIcons } from "./render";

export function renderCombat(state) {
  document.getElementById("combatBannerElement").innerHTML =
    state.currentEnemy.name;
  renderCombatHud(state);
  renderCharacters(state);
  renderBuffs(state);
  renderSpellbook(state);
}

function renderCombatHud(state) {
  const combatHp = document.getElementById("combatHp");
  const combatShield = document.getElementById("combatShield");
  const enemyHp = document.getElementById("enemyHp");
  const enemyAttack = document.getElementById("enemyAttack");
  const ink = document.getElementById("ink-number");

  let currentHp = getNumberFromElement(combatHp); // Only the current HP value
  let currentShield = getNumberFromElement(combatShield);
  let currentEnemyHp = getNumberFromElement(enemyHp);
  console.log("Current enemy hp", currentEnemyHp);
  let currentEnemyAttack = getNumberFromElement(enemyAttack);
  let currentInk = getNumberFromElement(ink);

  // Call the ticking function for player's current HP (with max HP displayed), shield, and enemy stats
  tickPlayerHp(combatHp, currentHp, state.hp, state.maxHp);
  tickNumber(combatShield, currentShield, state.shield, "Shield: ");
  tickNumber(enemyHp, currentEnemyHp, state.currentEnemy.hp, "HP: ");
  console.log("Current enemy hp", state.currentEnemy.hp);
  tickNumber(
    enemyAttack,
    currentEnemyAttack,
    state.currentEnemy.attack,
    "Attack: "
  );
  tickNumber(ink, currentInk, state.combatInk, "Ink: ");
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
function renderBuffs(state) {
  const buffDisplay = document.getElementById("enemyBuffDisplay");

  // let html = "";
  // state.currentEnemy.buffs.forEach((buff) => {
  //   html += `<div><img class="buff" src="${buffs[buff.imgName]}" alt="${
  //     buff.name
  //   }">
  //   </div>`;
  // });
  let html = "";
  state.currentEnemy.buffs.forEach((buff, index) => {
    let buffText = generateBuffText(buff, state);
    html += `<div class="tooltip buff-image" style="position: relative;">
          <img src="${
            buffs[buff.imgName]
          }" class="buff" id="buff${index}"style="display: block;">
          <img src=${
            buffs["brokenBuff"]
          } class="brokenBuff" id="brokenBuff${index}" style="display:none;">
          <span class="tooltiptext buff-text" style="position:absolute;" >
            <strong style="font-size: 20px;">${buff.name}</strong><br>
            
            ${buffText}
          </span>
        </div>
      `;
  });
  buffDisplay.innerHTML = html;
}

function generateBuffText(buff, state) {
  let buffText = "";
  if (buff.name === "Shield") {
    buffText += `${buff.storedValue} bonus HP.`;
  } else if (buff.name === "Weaken") {
    buffText += `Reduces your bunnies by ${-buff.storedValue}.`;
  } else if (buff.name === "Enchanted") {
    buffText += `${buff.storedValue} extra damage.`;
  } else if (buff.name === "Heart") {
    buffText += `+50% HP.`;
  } else {
    buffText += buff.effect;
  }
  return buffText;
}

function renderSpellbook(state) {
  let outputDiv = document.getElementById("combatOutput");
  let spellbook = state.spellbook;
  let pageWidth = 900 / state.spellbook.length;

  let html = "";
  console.log(state.spellbook);
  spellbook.forEach((spell, index) => {
    if (spell === "page") {
      //should have the image of page, displayElementImages[page];

      html += `
  <div class="spellbook-page" id="page${index}" data-index="${index}" style="width: ${pageWidth}px">
    <img src="${displayElementImages["emptyPage"]}" alt="page" class="spellbook-page-image">
    <div class="spellbook-page-text">Empty Page</div>
  </div>
  `;
    } else {
      console.log("spell", spell);
      html += `
  <div class="spellbook-page" id="page${index}" data-index="${index}" style="width: ${pageWidth}px">
  <img src="${
    spellIcons[spell.imgName]
  }" alt="card" class="spellbook-page-image style="display:flex"">
    <div class="spellbook-page-text">${spell.name}</div>
  </div>
  `;
    }
  });
  outputDiv.innerHTML = html;
}
