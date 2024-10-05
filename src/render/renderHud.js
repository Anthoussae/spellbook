"use strict";

import { resumeGame } from "./render";
import { renderBagExamine } from "./renderBagExamine";
import { renderDeckExamine } from "./renderDeckExamine";

const hudEventRemovers = [];

//seems to be assigning click handlers to the bag and deck buttons multiple times.
export function renderHud(oldState) {
  let state = { ...oldState };
  console.log(
    "Before renderHud:",
    "previousHp",
    state.previousHp,
    "hp",
    state.hp,
    "previousHp",
    state.previousHp,
    "maxHp",
    state.maxHp,
    "previousGold",
    state.previousGold,
    "gold",
    state.gold
  );
  // console.log(new Error().stack);
  removeAllHudEventHandlers();
  renderGold(state);
  renderKeys(state);
  renderHp(state);
  renderLevel(state);
  renderDeckButton(state);
  renderBagButton(state);
  console.log(
    "After renderHud:",
    "previousHp",
    state.previousHp,
    "hp",
    state.hp,
    "previousHp",
    state.previousHp,
    "maxHp",
    state.maxHp,
    "previousGold",
    state.previousGold,
    "gold",
    state.gold
  );
}

function renderLevel(state) {
  let levelDivs = document.querySelectorAll(".level");
  levelDivs.forEach((levelDiv) => {
    levelDiv.innerHTML = "Level: " + state.level;
  });
}

function renderKeys(state) {
  let keysDivs = document.querySelectorAll(".keys");
  keysDivs.forEach((keysDiv) => {
    keysDiv.innerHTML = "Keys: " + state.keys;
  });
}

function renderGold(state) {
  const goldDivs = document.querySelectorAll(".gold"); // NodeList of all elements with the class 'gold'
  const previousGold = state.previousGold;
  const gold = state.gold;

  goldDivs.forEach((goldDiv) => {
    tickUpAnimation(previousGold, gold, function (value) {
      goldDiv.textContent = `Gold: ${value}`;
    });

    if (previousGold == gold) {
      goldDiv.textContent = `Gold: ${gold}`;
    }
  });
  state.previousGold = gold;
}

//currently bugged: Hp doesn't properly tick up animation, reticks up at random occasions when renderHud is called.
//should be relatively easy to debug.
function renderHp(state) {
  const hpDivs = document.querySelectorAll(".hp"); // Select all elements with the class 'hp'
  const previousHp = state.previousHp || state.hp;
  const previousMaxHp = state.previousMaxHp || state.maxHp;
  const hp = state.hp;
  const maxHp = state.maxHp;

  hpDivs.forEach((hpDiv) => {
    // Run animation for hp
    tickUpAnimation(previousHp, hp, function (value) {
      updateHpDisplay(value, maxHp, hpDiv); // Use the current maxHp here
    });

    // Run animation for maxHp
    tickUpAnimation(previousMaxHp, maxHp, function (value) {
      updateHpDisplay(hp, value, hpDiv); // Use the current hp here
    });

    updateHpDisplay(hp, maxHp, hpDiv);
  });
  state.previousMaxHp = maxHp;
  state.previousHp = hp;
}

function tickUpAnimation(startValue, endValue, updateCallback) {
  if (startValue === endValue) {
    return;
  }

  let duration = 1000; // Total duration of the animation in milliseconds
  let frameRate = 60; // Frames per second
  let totalFrames = (duration / 1000) * frameRate;
  let increment = (endValue - startValue) / totalFrames;
  let currentValue = startValue;

  function updateValue() {
    currentValue += increment;
    updateCallback(Math.round(currentValue));

    if (
      (increment > 0 && currentValue < endValue) ||
      (increment < 0 && currentValue > endValue)
    ) {
      requestAnimationFrame(updateValue);
    } else {
      updateCallback(endValue); // Ensure the final value is set
    }
  }

  requestAnimationFrame(updateValue);
}

function updateHpDisplay(hp, maxHp, element) {
  element.textContent = `HP: ${hp}/${maxHp}`;
}

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
  bagButton.style.backgroundColor = isBagExamine ? "#271d63" : "";
  bagText.innerHTML = isBagExamine
    ? "Exit"
    : `Relics: (${state.relicBelt.length})`;

  // Ensure event handler is managed properly
  const bagClickHandler = handleBagButtonClick(state, isBagExamine);
  addHudEventListener(bagButton, "click", bagClickHandler);
  // bagButton.addEventListener(
  //   "click",
  //   (event) => {
  //     bagClickHandler(event);
  //     bagButton.removeEventListener("click", bagClickHandler);
  //   },
  //   { once: true }
  // );
}

function renderDeckButton(state) {
  const deckButton = document.querySelector(
    `#${state.currentScreen} .deckContainer`
  );

  const deckText = deckButton.querySelector(".deckText");
  const isDeckExamine = state.currentScreen === "deckExamine";
  deckButton.style.backgroundColor = isDeckExamine ? "#06450b" : "";
  deckText.innerHTML = isDeckExamine
    ? "Exit"
    : state.currentScreen === "combat"
    ? `Remaining Deck: (${state.combatDeck.length})`
    : `Deck: (${state.deck.length})`;
  const deckClickHandler = handleDeckButtonClick(state, isDeckExamine);
  addHudEventListener(deckButton, "click", deckClickHandler);
  // deckButton.addEventListener(
  //   "click",
  //   (event) => {
  //     deckClickHandler(event);
  //     deckButton.removeEventListener("click", deckClickHandler);
  //   },
  //   { once: true }
  // );
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
