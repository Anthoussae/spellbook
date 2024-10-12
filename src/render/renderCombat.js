"use strict";
import { renderHud } from "./renderHud";
import { getNumberFromElement } from "../util/getNumberFromElement";
import { tickNumber } from "../util/tickNumber";
import { tickPlayerHp } from "../util/tickPlayerHp";
import { characters } from "./render";
import { buffs } from "./render";
import { displayElementImages } from "./render";
import { spellIcons } from "./render";
import { updateCastBunnies } from "../state/combat/updateCastBunnies";
import { castSpellbook } from "../state/combat/castSpellbook";

export function renderCombat(state) {
  document.getElementById("combatBannerElement").innerHTML =
    state.currentEnemy.name;
  renderCombatHud(state);
  renderCharacters(state);
  renderBuffs(state);
  renderSpellbook(state);
  renderCastButton(state);
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

export function renderCastButton(state) {
  let castButtonDiv = document.getElementById("castButtonContainer");
  let html = `<button id="castBtn" class="menuBtn">Cast Spellbook</button>`;
  castButtonDiv.innerHTML = "";
  castButtonDiv.innerHTML = html;
  state = updateCastBunnies(state);
  console.log("castBunnies", state.castBunnies);
  let castButton = document.getElementById("castBtn");
  castButton.innerHTML = `Cast (${state.castBunnies})`;
  castButton.onclick = function () {
    console.log("Casting", state.spellbook);
    castSpellbook(state);
  };
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

//spell effect

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
      let spellEffect = generateSpellText(spell);
      html += `
  <div class="spellbook-page" id="page${index}" data-index="${index}" style="width: ${pageWidth}px">
  <img src="${
    spellIcons[spell.imgName]
  }" alt="card" class="spellbook-page-image style="display:flex"">
    <div class="spellbook-page-text">${spell.name}</div>
        <div class="spellbook-page-effect">${spellEffect}</div>

  </div>
  `;
    }
  });
  outputDiv.innerHTML = html;
}

//roughly copied from render card. COuld be refactored.
function generateSpellText(spell) {
  let cardText = "";
  let card = { ...spell };

  let inkCost = "";
  if (card.ink) {
    inkCost = card.ink;
  }

  let typeColor = "black";

  if (card.trigger === "instant") {
    typeColor = "white";
  }

  // Handle card text to include colors corresponding to upgrades.
  let numberColor = "black";
  if (card.upgrade) {
    if (card.upgrade > 0) {
      numberColor = "green";
    } else if (card.upgrade < 0) {
      numberColor = "red";
    }
  }

  // Dynamic card text and number color logic with singular/plural handling
  if (card.bunnyAdd) {
    const bunnyWord = card.bunnyAdd === 1 ? "bunny" : "bunnies";
    cardText += `Adds <span style="color: ${numberColor};">${card.bunnyAdd}</span> ${bunnyWord}.`;
  }
  if (card.bunnyMult) {
    cardText += `Multiplies bunnies by <span style="color: ${numberColor};">${card.bunnyMult}</span>.`;
  }
  if (card.cardsDrawn) {
    const cardWord = card.cardsDrawn === 1 ? "card" : "cards";
    cardText += `Draw <span style="color: ${numberColor};">${card.cardsDrawn}</span> ${cardWord}.`;
  }
  if (card.retriggers) {
    const timeWord = card.retriggers === 1 ? "time" : "times";
    cardText += `Retriggers <span style="color: ${numberColor};">${card.retriggers}</span> ${timeWord}.`;
    if (card.name === "Echoing Splash") {
      cardText += " Affects spells to the left and right.";
    }
    if (card.name === "Time Warp") {
      cardText += " Affects all spells.";
    }
    if (card.name === "Time Flip") {
      cardText += " Affects all spells cast so far, in reverse order.";
    }
  }
  if (card.inkAdd) {
    cardText += `Adds <span style="color: ${numberColor};">${card.inkAdd}</span> ink.`;
  }
  if (card.reduceEnemyMaxHpFraction) {
    cardText += `Reduces enemy max hp by <span style="color: ${numberColor};">${
      card.reduceEnemyMaxHpFraction * 100
    }%</span>.`;
  }
  if (card.name === "Golden Bunny") {
    cardText += `Adds bunnies equal to <span style="color: ${numberColor};">${card.bunnyAdd}</span> plus 10% of your current gold.`;
  }
  if (card.purge) {
    const cardWord = card.purge === 1 ? "card" : "cards";
    cardText += `Purges <span style="color: ${numberColor};">${card.purge}</span> ${cardWord}.`;
  }
  if (card.pageAdd) {
    const pageWord = card.pageAdd === 1 ? "page" : "pages";
    cardText += `Adds <span style="color: ${numberColor};">${card.pageAdd}</span> ${pageWord}.`;
  }

  return cardText;
}
