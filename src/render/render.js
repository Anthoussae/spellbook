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

function renderMythicSelection(oldState) {
  // let state = { ...oldState };
  // let outputDiv = document.getElementById("mythicSelectionOutput");
  // let options = state.mythicRewards;
  // let html = "";
  // html += `<h1 class="reward-selection-title"></h1>`;
  // options.forEach((option, optionIndex) => {
  //   html += `<button class="reward-button" data-index="${optionIndex}">${option.name}</button>`;
  // });
  // // Insert the buttons into the output container
  // outputDiv.innerHTML = html;
  // // Add event listeners to the buttons
  // const btnElems = document.querySelectorAll("#output .reward-button");
  // btnElems.forEach((btnElem) => {
  //   btnElem.addEventListener("click", () => {
  //     const option = state.presentedOptions[btnElem.dataset.index];
  //     state.selectedReward = option;
  //     state = applyReward(state);
  //     startPathSelection(state);
  //   });
  // });
  console.log("Hello");
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

//works
// function renderBelt(oldState) {
//   let state = { ...oldState };
//   console.log("rendering belt", state.relicBelt);
//   let beltDiv = document.getElementById("beltElement");
//   let imagePath = require("../data/imgs/mythicRelics/Orchid.png"); // Webpack resolves this
//   let html = "";
//   html += `<img src="${imagePath}" alt="Orchid">`;
//   beltDiv.innerHTML = html;
//   console.log(beltDiv.innerHTML);
// }

// Statically import images
const relicImages = {
  //mythics
  orchid: require("../data/imgs/mythicRelics/orchid.png"),
  grandmagusTome: require("../data/imgs/mythicRelics/grandmagusTome.png"),
  goldenEgg: require("../data/imgs/mythicRelics/goldenEgg.png"),
  //relics
  magicWand: require("../data/imgs/relics/magicWand.png"),
  brokenWand: require("../data/imgs/relics/brokenWand.png"),
};

function renderBelt(oldState) {
  let state = { ...oldState };
  let beltDiv = document.getElementById("beltElement");
  let html = "";
  state.relicBelt.forEach((relic) => {
    let imagePath = relicImages[relic.imgName]; // Dynamically choose the image based on the relic's imgName

    if (imagePath && relic.name != "Magic Wand") {
      html += `
      <div class="tooltip">
        <img src="${imagePath}" alt="${relic.name}">
        <span class="tooltiptext">
          <strong style="font-size: 22px;">${relic.name}</strong><br>
          <em>${relic.effect}</em>
        </span>
      </div>
    `;
    } else if (imagePath && relic.name == "Magic Wand") {
      html += `
      <div class="tooltip">
        <img src="${imagePath}" alt="${relic.name}">
        <span class="tooltiptext">
          <strong style="font-size: 22px;">${relic.name}</strong><br>
          <em>${relic.effect}</em>
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

  beltDiv.innerHTML = html;
}

// //dynamically import images
//ideal solution below - currently nonfunctional

// function renderBelt(oldState) {
//   let state = { ...oldState };
//   let beltDiv = document.getElementById("beltElement");
//   let relic = state.relicBelt[0];

//   // Dynamically import the image
//   import(`../data/imgs/mythicRelics/${relic.name}.png`)
//     .then((imagePath) => {
//       let html = `<img src="${imagePath.default}" alt="${relic.name}">`;
//       beltDiv.innerHTML = html;
//       console.log(beltDiv.innerHTML);
//     })
//     .catch((error) => {
//       let html = `<p>Image not found for ${relic.name}</p>`;
//       beltDiv.innerHTML = html;
//       console.log(beltDiv.innerHTML);
//     });
// }

// // function renderBelt(state) {
//   console.log("rendering belt", state.relicBelt);
//   let beltDiv = document.getElementById("beltElement");
//   if (!beltDiv) {
//     console.error("beltElement not found in the DOM.");
//     return;
//   }

//   beltDiv.innerHTML = ""; // Clear previous content

//   state.relicBelt.forEach((relic) => {
//     let relicImg = document.createElement("img");
//     const imgSrc = `data/imgs/mythicRelics/${relic.name}.png`;
//     relicImg.src = "Orchid.png";
//     relicImg.alt = relic.name;
//     relicImg.className = "relicImage";

//     relicImg.onerror = function () {
//       console.error(`Failed to load image: ${imgSrc}`);
//     };

//     console.log(`Appending image: ${imgSrc}`);
//     console.log(relicImg);
//     beltDiv.appendChild(relicImg);
//   });
// }
