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
      console.log("mythic selection");
      showScreen("mythicSelection");
      renderHpAndGold(state);
      renderLevel(state);
      renderDeckButton(state);
      renderBelt(state);
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

// Statically import images for relics
//Ideally upgrade this section, to permit dynamic image imports.
const relicImages = {
  //mythics
  orchid: require("../data/imgs/mythicRelics/orchid.png"),
  grandmagusTome: require("../data/imgs/mythicRelics/grandmagusTome.png"),
  goldenEgg: require("../data/imgs/mythicRelics/goldenEgg.png"),
  phoenixFeatherQuill: require("../data/imgs/mythicRelics/phoenixFeatherQuill.png"),
  bottomlessInkpot: require("../data/imgs/mythicRelics/bottomlessInkpot.png"),
  //relics
  magicWand: require("../data/imgs/relics/magicWand.png"),
  brokenWand: require("../data/imgs/relics/brokenWand.png"),
};

//complete relic belt (and relic) render logic
function renderBelt(oldState) {
  let state = { ...oldState };
  let beltDiv = document.getElementById("beltElement");
  let html = "";
  let relicBelt;
  if (state.relicBelt.length < 8) {
    relicBelt = state.relicBelt;
  } else if (false) {
    //if the relic belt is full, designate a special array with "displayed relics."
    //track a window of 7 "displayed relics"
    //Add "arrow button" images to "scroll" through the display window.
  }
  relicBelt.forEach((relic) => {
    let imagePath = relicImages[relic.imgName]; // Dynamically choose the image based on the relic's imgName

    if (imagePath && relic.supertype != "wand") {
      html += `
      <div class="tooltip">
        <img src="${imagePath}" alt="${relic.name}">
        <span class="tooltiptext">
          <strong style="font-size: 22px;">${relic.name}</strong><br>
          <em>${relic.effect}</em>
        </span>
      </div>
    `;
    } else if (imagePath && relic.supertype == "wand" && relic.upgrade > 0) {
      html += `
      <div class="tooltip">
        <img src="${imagePath}" alt="${relic.name}">
        <span class="tooltiptext">
          <strong style="font-size: 22px;">${relic.name}</strong><br>
          <em>-------------------</em><br>
          <em>When you cast, gain <span style="color: lightgreen;">${relic.bunnyAdd}</span> bonus bunnies</em>
        </span>
      </div>
    `;
    } else if (imagePath && relic.supertype == "wand") {
      html += `
      <div class="tooltip">
        <img src="${imagePath}" alt="${relic.name}">
        <span class="tooltiptext">
          <strong style="font-size: 22px;">${relic.name}</strong><br>
          <em>-------------------</em><br>
          <em>When you cast, gain <span style="color: white;">${relic.bunnyAdd}</span> bonus bunnies</em>
        </span>
      </div>
    `;
    } else {
      html += `
      <div class="tooltip">
        <p>Image not found for ${relic.name}</p>
      </div>
    `;
    }
  });
  // arrow button images and logic if the relic belt is too crowded.
  beltDiv.innerHTML = html;
}

//complete mythic render logic
function renderMythicSelection(state) {
  let outputDiv = document.getElementById("mythicSelectionOutput");
  let options = state.mythicRewards;
  console.log("mythic rewards", state.mythicRewards);
  let html = "";

  options.forEach((relic, index) => {
    let imagePath = relicImages[relic.imgName];
    html += `
      <div class="tooltip">
        <img src="${imagePath}" alt="${relic.name}" class="relic-image" data-index="${index}">
        <span class="tooltiptext">
          <strong style="font-size: 22px;">${relic.name}</strong><br>
          <em>-------------------</em><br>
          <em>${relic.effect}</em>
        </span>
      </div>
    `;
  });

  // Insert the HTML content into the outputDiv
  outputDiv.innerHTML = html;

  // Add event listeners to the images after they have been inserted into the DOM
  const imgElems = document.querySelectorAll(
    "#mythicSelectionOutput .relic-image"
  );
  imgElems.forEach((imgElem) => {
    imgElem.addEventListener("click", () => {
      const clickedIndex = imgElem.dataset.index;
      const selectedRelic = state.mythicRewards[clickedIndex];
      // Handle the click event, e.g., apply the selected relic, log it, etc.
      console.log(`You clicked on ${selectedRelic.name}`, selectedRelic);
      // Implement further actions here as needed
      //pick the relic and add it to belt
      //animate the movement of the relic
      //the other relics vanish in a puff of smoke
      //initate the next appropriate screen
    });
  });
}
