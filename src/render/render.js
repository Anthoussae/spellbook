"use strict";

//game state functions
import { renderRest } from "./renderRest";
import { renderBattlefield } from "./renderBattlefield";
import { renderWandUpgrade } from "./renderWandUpgrade";
import { renderShop } from "./renderShop";
import { renderSocketing } from "./renderSocketing";
import { renderPathSelection } from "./renderPathSelection";
import { renderDeckExamine } from "./renderDeckExamine";
import { renderCombatRecap } from "./renderCombatRecap";
import { renderButtons } from "./renderButtons";
import { renderBattleHud } from "./renderBattleHud";
import { renderHud } from "./renderHud";

//fix the 'render combat recap - it should be a separate screen to reward selection.""
export function render(oldState) {
  let state = { ...oldState };

  if (state.currentScreen == "start") {
    showScreen("start");
  } else {
    if (state.currentScreen === "difficultySelection") {
      showScreen("difficultySelection");
    } else if (state.currentScreen === "mythicSelection") {
      showScreen("mythicSelection");
      renderHpAndGold(state);
      renderLevel(state);
      renderDeckButton(state);
      renderBelt;
      renderMythicSelection(state);
    } else if (state.currentScreen == "pathSelection") {
      renderPathSelection(state);
    } else if (state.currentScreen == "rest") {
      renderRest(state);
    } else if (state.currentScreen == "combat") {
      renderBattlefield(state);
    } else if (state.currentScreen == "wandUpgrade") {
      renderWandUpgrade(state);
    } else if (state.currentScreen === "deckExamine") {
      renderDeckExamine(state);
    } else if (state.currentScreen === "socketing") {
      renderSocketing(state);
    } else if (state.currentScreen === "shop") {
      renderShop(state);
    } else if (state.currentScreen === "combatRecap") {
      renderCombatRecap(state);
    } else if (state.currentScreen === "rewardSelection") {
      renderRewardSelection(state);
    } else {
      throw "unknown screen: " + state.currentScreen;
    }
  }
}

function hideAllScreens() {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((screen) => {
    screen.style.display = "none";
  });
}

function showScreen(screenId) {
  hideAllScreens(); // First hide all screens
  document.getElementById(screenId).style.display = "block"; // Then show the desired screen
}

function renderMythicSelection(oldState) {
  let state = { ...oldState };
  let outputDiv = document.getElementById("mythicSelectionOutput");
  let options = state.mythicRewards;

  let html = "";
  html += `<h1 class="reward-selection-title"></h1>`;
  options.forEach((option, optionIndex) => {
    html += `<button class="reward-button" data-index="${optionIndex}">${option.name}</button>`;
  });

  // Insert the buttons into the output container
  outputDiv.innerHTML = html;

  // Add event listeners to the buttons
  const btnElems = document.querySelectorAll("#output .reward-button");
  btnElems.forEach((btnElem) => {
    btnElem.addEventListener("click", () => {
      const option = state.presentedOptions[btnElem.dataset.index];
      state.selectedReward = option;
      state = applyReward(state);
      renderHud(state);
      renderRelicBelt(state);
      startPathSelection(state);
    });
  });
}

function renderLevel(state) {
  let levelDiv = document.getElementById("levelElement");
  levelDiv.innerHTML = "Level: " + state.level;
}

function renderHpAndGold(state) {
  let hpDiv = document.getElementById("hpValue");
  let goldDiv = document.getElementById("goldValue");

  let previousGold = state.previousGold;
  let previousHp = state.previousHp;
  let hp = state.hp;
  let gold = state.gold;

  tickUpAnimation(previousHp, hp, hpDiv);
  tickUpAnimation(previousGold, gold, goldDiv);
}

function tickUpAnimation(startValue, endValue, element) {
  if (startValue === endValue) return;

  let duration = 1000; // Total duration of the animation in milliseconds
  let frameRate = 60; // Frames per second
  let totalFrames = (duration / 1000) * frameRate;
  let increment = (endValue - startValue) / totalFrames;
  let currentValue = startValue;

  // Determine if the value is increasing or decreasing
  if (increment > 0) {
    element.style.color = "green"; // Green for increasing
  } else {
    element.style.color = "red"; // Red for decreasing
  }

  function updateValue() {
    currentValue += increment;
    element.textContent = Math.round(currentValue);

    if (
      (increment > 0 && currentValue < endValue) ||
      (increment < 0 && currentValue > endValue)
    ) {
      requestAnimationFrame(updateValue);
    } else {
      element.textContent = endValue; // Ensure the final value is set
      element.style.color = ""; // Reset color to default
    }
  }

  requestAnimationFrame(updateValue);
}

function renderDeckButton(state) {
  const deckButton = document.getElementById("deckBtn");
  if (state.currentScreen != "combat") {
    deckButton.innerHTML = "Deck: (" + state.deck.length + ")";
    if (deckButton) {
      deckButton.addEventListener("click", () => {
        if (state) {
          renderDeckExamine(state);
        } else {
          console.error("State is not defined yet.");
        }
      });
    } else {
      console.error("Deck button not found.");
    }
  } else if (state.currentScreen == "combat") {
    deckButton.innerHTML = "Remaining Deck: (" + state.combatDeck.length + ")";
    if (deckButton) {
      deckButton.addEventListener("click", () => {
        if (state) {
          renderDeckExamine(state);
        } else {
          console.error("State is not defined yet.");
        }
      });
    }
  }
}

function renderBelt(state) {
  let beltDiv = document.getElementById("beltElement");
  beltDiv.innerHTML = ""; // Clear previous content

  state.relicBelt.forEach((relic) => {
    let relicImg = document.createElement("img");
    relicImg.src = `data/imgs/relics/${relic}.png`; // Assuming .png extension
    relicImg.alt = relic;
    relicImg.className = "relicImage";
    beltDiv.appendChild(relicImg);
  });
}
