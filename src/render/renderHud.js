"use strict";

import { resumeGame } from "./render";
import { renderBagExamine } from "./renderBagExamine";
import { renderDeckExamine } from "./renderDeckExamine";
import { getNumberFromElement } from "../util/getNumberFromElement";
import { tickNumber } from "../util/tickNumber";
import { tickPlayerHp } from "../util/tickPlayerHp";
import { renderCombat } from "./renderCombat";

const hudEventRemovers = [];

//seems to be assigning click handlers to the bag and deck buttons multiple times.
export function renderHud(oldState) {
  let state = { ...oldState };
  // console.log(new Error().stack);
  removeAllHudEventHandlers();
  renderNumbers(state);

  renderDeckButton(state);
  renderBagButton(state);
  if (state.currentScreen === "combat") {
    renderCombat(state);
  }
}

//bag and deck buttons
//these are currently bugged during combat - they do not seem to acquire the correct state.
// Store click handler reference outside the function
function handleBagButtonClick(state, isBagExamine) {
  return (event) => {
    event.stopPropagation();
    if (isBagExamine) {
      resumeGame(state); // This should return to the previous screen
    } else {
      renderBagExamine(state); // Go to bag examine
    }
  };
}

function handleDeckButtonClick(state, isDeckExamine) {
  return (event) => {
    event.stopPropagation();
    if (isDeckExamine) {
      resumeGame(state);
    } else {
      renderDeckExamine(state);
    }
  };
}

function renderBagButton(state) {
  const bagButton = document.querySelector(
    `#${state.currentScreen} .bagContainer`
  );

  const bagText = bagButton.querySelector(".bagText");
  const isBagExamine = state.currentScreen === "bagExamine";

  // Set background color based on screen
  bagButton.style.backgroundColor = isBagExamine ? "#00008066" : "";
  bagText.innerHTML = isBagExamine
    ? "Exit"
    : `Relics: (${state.relicBelt.length})`;

  // Ensure event handler is managed properly
  const bagClickHandler = handleBagButtonClick(state, isBagExamine);
  addHudEventListener(bagButton, "click", bagClickHandler);
}

function renderDeckButton(state) {
  const deckButton = document.querySelector(
    `#${state.currentScreen} .deckContainer`
  );

  const deckText = deckButton.querySelector(".deckText");
  const isDeckExamine = state.currentScreen === "deckExamine";
  deckButton.style.backgroundColor = isDeckExamine ? "#00800066" : "";
  deckText.innerHTML = isDeckExamine
    ? "Exit"
    : state.currentScreen === "combat"
    ? `Remaining Deck: (${state.combatDeck.length})`
    : `Deck: (${state.deck.length})`;
  const deckClickHandler = handleDeckButtonClick(state, isDeckExamine);
  addHudEventListener(deckButton, "click", deckClickHandler);
}

function addHudEventListener(elem, type, handler) {
  elem.addEventListener(type, handler);

  hudEventRemovers.push(() => {
    elem.removeEventListener(type, handler);
  });
}
function removeAllHudEventHandlers() {
  for (const hudEventRemover of hudEventRemovers) {
    hudEventRemover();
  }
  hudEventRemovers.length = 0;
}

//render various hud elements with numbers.
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function renderNumbers(state) {
  const levelDivs = document.querySelectorAll(".level");
  const keysDivs = document.querySelectorAll(".keys");
  const goldDivs = document.querySelectorAll(".gold");
  const hpDivs = document.querySelectorAll(".hp");

  let currentLevel = getNumberFromElement(levelDivs[0]);
  levelDivs.innerHTML = "Level: " + currentLevel;
  let currentKeys = getNumberFromElement(keysDivs[0]);
  keysDivs.innerHTML = "Keys: " + currentKeys;
  let currentGold = getNumberFromElement(goldDivs[0]);
  goldDivs.innerHTML = "Gold: " + currentGold;
  let currentHp = getNumberFromElement(hpDivs[0]);
  hpDivs.innerHTML = "HP: " + currentHp;

  for (let i = 0; i < keysDivs.length; i++) {
    console.log("currentKeys", currentKeys, "state.keys", state.keys);
    tickNumber(keysDivs[i], currentKeys || 0, state.keys, "Keys: ");
  }
  for (let i = 0; i < levelDivs.length; i++) {
    tickNumber(levelDivs[i], currentLevel || -1, state.level, "Level: ");
  }
  for (let i = 0; i < goldDivs.length; i++) {
    tickNumber(goldDivs[i], currentGold || 0, state.gold, "Gold: ");
  }
  for (let i = 0; i < hpDivs.length; i++) {
    tickPlayerHp(hpDivs[i], currentHp || 0, state.hp, state.maxHp);
  }
}
