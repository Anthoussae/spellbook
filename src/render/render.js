"use strict";

//to do:
//add animations for non-selected relics.
//render bag examine.
//render deck examine.
//implement relic check trigger function when a relic is selected.

//render functions
import { renderRest } from "./renderRest";
import { renderBattlefield } from "./renderBattlefield";
import { renderWandUpgrade } from "./renderWandUpgrade";
import { renderShop } from "./renderShop";
import { renderSocketing } from "./renderSocketing";
import { renderCombatRecap } from "./renderCombatRecap";
//state functions
import { pickupRelic } from "../state/pickupRelic";

export function render(oldState) {
  let state = { ...oldState };
  console.log("arriving at render");

  if (state.currentScreen == "start") {
    showScreen("start");
  } else {
    if (state.currentScreen === "difficultySelection") {
      showScreen("difficultySelection");
    } else if (state.currentScreen === "mythicSelection") {
      showScreen("mythicSelection");
      renderHud(state);
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

//screen display toggle functions
function hideAllScreens() {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((screen) => {
    screen.style.display = "none";
  });
}
function showScreen(screenId) {
  hideAllScreens(); // First hide all screens
  document.getElementById(screenId).style.display = "flex"; // Then show the desired screen
}

function renderHud(oldState) {
  let state = { ...oldState };
  renderGold(state);
  renderHp(state);
  renderLevel(state);
  renderDeckButton(state);
  renderBagButton(state);
}

function renderLevel(state) {
  let levelDivs = document.querySelectorAll(".level");
  levelDivs.forEach((levelDiv) => {
    levelDiv.innerHTML = "Level: " + state.level;
  });
}

// Statically import images for relics
//Ideally upgrade this section, to permit dynamic image imports.
const relicImages = {
  //mythics
  orchid: require("../data/imgs/mythicRelics/orchid.png"),
  grandmagusTome: require("../data/imgs/mythicRelics/grandmagusTome.png"),
  goldenEgg: require("../data/imgs/mythicRelics/goldenEgg.png"),
  phoenixFeatherQuill: require("../data/imgs/mythicRelics/phoenixFeatherQuill.png"),
  eternalInkstone: require("../data/imgs/mythicRelics/eternalInkstone.png"),
  //relics
  magicWand: require("../data/imgs/relics/magicWand.png"),
  brokenWand: require("../data/imgs/relics/brokenWand.png"),
  inkpot: require("../data/imgs/relics/inkpot.png"),
  brush: require("../data/imgs/relics/brush.png"),
  scroll: require("../data/imgs/relics/scroll.png"),
  hydrangea: require("../data/imgs/relics/hydrangea.png"),
  magicStaff: require("../data/imgs/relics/magicStaff.png"),
  goldIngot: require("../data/imgs/relics/goldIngot.png"),
  encyclopaedia: require("../data/imgs/relics/encyclopaedia.png"),
  golfBall: require("../data/imgs/relics/golfBall.png"),
};

const animationImages = {
  //poofs
  poof: require("../data/imgs/displayElements/poof.png"),
  bigPoof: require("../data/imgs/displayElements/bigPoof.png"),
  tinyPoof: require("../data/imgs/displayElements/tinyPoof.png"),
  tinyBunny: require("../data/imgs/displayElements/tinyBunny.png"),
  leapingbunnyFront: require("../data/imgs/displayElements/leapingbunnyFront.png"),
  leapingBunnyBack: require("../data/imgs/displayElements/leapingBunnyBack.png"),
};

const displayElementImages = {
  backpackImage: require("../data/imgs/displayElements/backpack.png"),
  mythicCarpet: require("../data/imgs/displayElements/mythicCarpet.png"),
  deckImage: require("../data/imgs/displayElements/deck.png"),
};

function renderMythicSelection(state) {
  // Show the carpet background
  document.getElementById("redCarpetBackground").style.display = "block";

  // Get the output div where relics will be displayed
  let outputDiv = document.getElementById("mythicSelectionOutput");
  // get the mythic relics for display.
  let options = state.mythicRewards;

  // Build HTML for each relic, turning it into a button with a tooltip and the appropriate onclick effect.
  let html = "";
  options.forEach((relic, index) => {
    let imagePath = relicImages[relic.imgName];
    html += `
      <div class="tooltip relic-container" style="position: relative;">
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

  // Add event listeners to the relic images
  const imgElems = document.querySelectorAll(
    "#mythicSelectionOutput .relic-image"
  );

  // Ensure relics are reset to their initial state before any animation
  imgElems.forEach((imgElem) => {
    imgElem.addEventListener("click", () => {
      const clickedIndex = imgElem.dataset.index;
      const selectedRelic = state.mythicRewards[clickedIndex];

      // Log which relic was clicked
      console.log(`You clicked on ${selectedRelic.name}`, selectedRelic);

      // Add a slight delay before starting the non-selected relic animations
      setTimeout(() => {
        imgElems.forEach((elem) => {
          if (elem.dataset.index !== clickedIndex) {
            // Use requestAnimationFrame to ensure the class is applied correctly
            requestAnimationFrame(() => {
              // Now apply the fade-out class
              elem.classList.add("relic-fade");
            });
          }
        });

        imgElems.forEach((elem) => {
          if (elem.dataset.index !== clickedIndex) {
            const computedStyle = window.getComputedStyle(elem);
            console.log(
              `Relic index ${elem.dataset.index}: transform: ${computedStyle.transform}, opacity: ${computedStyle.opacity}`
            );
          }
        });
      }, 10); // Small delay to ensure proper sequencing

      // Animate the selected relic to the backpack
      animateRelicToBag(
        imgElem,
        document.getElementById("bagBtn"),
        state,
        selectedRelic
      );
    });
  });
}

// Animate the selected relic image towards the bag
function animateRelicToBag(relicElem, bagElem, state, selectedRelic) {
  const relicRect = relicElem.getBoundingClientRect();
  const bagRect = bagElem.getBoundingClientRect();

  const translateX =
    bagRect.left + bagRect.width / 2 - (relicRect.left + relicRect.width / 2);
  const translateY =
    bagRect.top + bagRect.height / 2 - (relicRect.top + relicRect.height / 2);

  // Force relayout
  relicElem.getBoundingClientRect();

  relicElem.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  relicElem.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.1)`; // Move and scale down
  relicElem.style.opacity = "0"; // Fade out during the animation

  // Listen for the transitionend event
  relicElem.addEventListener("transitionend", function onTransitionEnd() {
    relicElem.style.display = "none";
    // Remove the event listener to avoid potential memory leaks
    relicElem.removeEventListener("transitionend", onTransitionEnd);

    //pick up the relic
    state = pickupRelic(state, selectedRelic);
    console.log("relicBelt", state.relicBelt);
    // Proceed to the next screen
    renderPathSelection(state);
  });
}

function renderBagButton(state) {
  const oldBagButton = document.getElementById("bagBtn");
  const newBagButton = oldBagButton.cloneNode(true); // Create a fresh copy of the button

  oldBagButton.replaceWith(newBagButton); // Replace the old button with the new one

  const bagText = newBagButton.querySelector(".bagText");
  bagText.innerHTML = "Relics: (" + state.relicBelt.length + ")";

  newBagButton.addEventListener(
    "click",
    () => {
      renderBagExamine(state);
    },
    { once: true } // Listener is removed after a single execution
  );
}

function renderBagExamine(oldState) {
  let state = { ...oldState };

  // Render the HUD
  renderHud(state);

  console.log("bag examine", state);
  let bag = state.relicPool;
  let outputDiv = document.getElementById("bagExamineOutput");

  // Define the CSS grid for the relic container with reduced gap
  outputDiv.style.display = "grid";
  outputDiv.style.gridTemplateColumns = "repeat(7, 1fr)"; // 7 items per row
  outputDiv.style.gap = "10px"; // Small gap between the relics

  let html = "";
  bag.forEach((relic, index) => {
    let imagePath = relicImages[relic.imgName];
    html += `
      <div class="tooltip relic-container" style="position: relative;">
        <img src="${imagePath}" alt="${relic.name}" class="relic-image" data-index="${index}" style="display: block;">
        <span class="tooltiptext" style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);">
          <strong style="font-size: 22px;">${relic.name}</strong><br>
          <em>-------------------</em><br>
          <em>${relic.effect}</em>
        </span>
      </div>
    `;
  });

  // Insert the HTML content into the outputDiv
  outputDiv.innerHTML = html;

  if (
    state.currentScreen !== "bagExamine" &&
    state.currentScreen !== "deckExamine"
  ) {
    state.previousScreen = state.currentScreen;
  }

  state.currentScreen = "bagExamine";

  showScreen(state.currentScreen);

  let resumeButton = document.getElementById("bag-resume-button");
  resumeButton.addEventListener(
    "click",
    () => {
      resumeGame(state);
    },
    { once: true }
  );
}

//the following 3 functions are bugged.
//currently, clicking on the deck button triggers it 3 times.
//while in the deck examine screen, the deck button doesn't work (it should "return to the previous screen")
//deck button doesn't work while in bag view, nor viceversa.
function resumeGame(state) {
  if (state.previousScreen) {
    state.currentScreen = state.previousScreen;
    state.previousScreen = null;
    render(state);
  }
}

function renderPathSelection(state) {
  showScreen("deckExamine");
  console.log("path selection", state);
}

export function renderGold(state) {
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
}

export function renderHp(state) {
  const hpDivs = document.querySelectorAll(".hp"); // Select all elements with the class 'hp'
  const previousHp = state.previousHp || 0;
  const previousMaxHp = state.previousMaxHp || 0;
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

    // If no change, directly update the display
    if (previousHp == hp) {
      updateHpDisplay(hp, maxHp, hpDiv);
    }
    if (previousMaxHp == maxHp) {
      updateHpDisplay(hp, maxHp, hpDiv);
    }
  });
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

// semi working
function renderDeckButton(state) {
  const deckButtons = document.querySelectorAll(".deckContainer");
  deckButtons.forEach((deckButton) => {
    const deckText = deckButton.querySelector(".deckText");

    // Determine button state based on currentScreen
    const isDeckExamine = state.currentScreen === "deckExamine";
    deckButton.style.backgroundColor = isDeckExamine ? "darkgreen" : "";
    deckText.innerHTML = isDeckExamine
      ? "Exit"
      : state.currentScreen === "combat"
      ? `Remaining Deck: (${state.combatDeck.length})`
      : `Deck: (${state.deck.length})`;

    // Remove any previous event listeners to avoid multiple bindings
    deckButton.replaceWith(deckButton.cloneNode(true)); // Optional clone to reset events
    const newDeckButton = document.querySelectorAll(".deckContainer")[0]; // Get the new element

    // Remove any previous event listeners to avoid duplicates
    const handleClick = (event) => {
      event.stopPropagation(); // Prevent bubbling issues

      if (isDeckExamine) {
        resumeGame(state); // This should return to the previous screen
      } else {
        renderDeckExamine(state); // Go to deck examine
      }
    };

    // Clear any existing listeners using named function references
    newDeckButton.removeEventListener("click", handleClick);
    newDeckButton.addEventListener("click", handleClick, { once: true });
  });
}
function renderDeckExamine(state) {
  const deck = state.currentScreen === "combat" ? state.combatDeck : state.deck;
  console.log("deck Examine", deck);

  // Only update previousScreen if not already in deckExamine or bagExamine
  if (!["bagExamine", "deckExamine"].includes(state.currentScreen)) {
    state.previousScreen = state.currentScreen;
  }

  // Toggle between deckExamine and bagExamine without overwriting previous screen
  if (
    state.currentScreen === "deckExamine" &&
    state.previousScreen === "bagExamine"
  ) {
    state.previousScreen = "bagExamine";
  }

  state.currentScreen = "deckExamine";
  renderHud(state);
  showScreen(state.currentScreen); // Ensure this displays the correct UI

  const resumeButton = document.getElementById("deck-resume-button");

  // Clear any existing listener, referencing the named function directly
  const resumeClick = () => resumeGame(state);

  resumeButton.removeEventListener("click", resumeClick);
  resumeButton.addEventListener("click", resumeClick, { once: true });
}
