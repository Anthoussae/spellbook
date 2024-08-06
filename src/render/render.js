"use strict";

//game state functions
import { applyReward } from "../state/applyReward";
import { startRest } from "../state/startRest";
import { startCombat } from "../state/startCombat";
import { startPathSelection } from "../state/startPathSelection";
import { startShop } from "../state/startShop";
import { startWandUpgrade } from "../state/startWandUpgrade";
import { findObjectInArray } from "../util/findObjectInArray";
import { startRewardSelection } from "../state/startRewardSelection";

export function render(oldState) {
  let state = { ...oldState };
  if (state.currentScreen == "pathSelection") {
    renderPathSelection(state);
  } else if (state.currentScreen == "rest") {
    renderRest(state);
  } else if (state.currentScreen == "combat") {
    renderBattlefield(state);
  } else if (state.currentScreen == "wandUpgrade") {
    renderWandUpgrade(state);
  } else if (state.currentScreen === "deckExamine") {
    console.log("deckExamine");
  } else if (state.currentScreen === "deckService") {
    console.log("deckService");
  } else if (state.currentScreen === "shop") {
    renderShop(state);
  } else if (state.currentScreen === "rewardSelection") {
    renderReward(state);
  } else {
    throw "unknown screen: " + state.currentScreen;
  }
}

function renderReward(state) {
  const options = state.presentedOptions;
  console.log(options);
  let html = "";
  for (const optionIndex in options) {
    const option = options[optionIndex];
    html += '<button data-index="' + optionIndex + '">';
    html += option.name;
    html += "</button>";
  }
  const outputDiv = document.querySelector("#output");
  outputDiv.innerHTML = html;
  document.querySelector("#output").innerHTML = state.presentedOptions
    .map(
      (option, optionIndex) =>
        '<button data-index="' + optionIndex + '">' + option.name + "</button>"
    )
    .join("");
  const btnElems = document.querySelectorAll("#output button");
  for (let btnElem of btnElems) {
    btnElem.addEventListener("click", () => {
      const name = btnElem.innerHTML;
      alert("You clicked " + name);
      const option = options[btnElem.dataset.index];
      //reward effect
      applyReward(option, state);
      renderHud(state);
      renderRelicBelt(state);
      startPathSelection(state);
    });
  }
}

function renderHud(state) {
  let html = "";
  html += "HP: " + state.hp + "/" + state.maxHp + " ";
  html += "Gold: " + state.gold + " ";
  html += "Level: " + state.level + " ";
  html +=
    "Wand Power: " +
    findObjectInArray(state.relicBelt, "supertype", "wand").bunnies +
    " ";
  html += "Bonus Bunnies: " + state.bonusBunnies + " ";
  // in final version add functionality so you can inspect deck by clicking on deck in hud
  html += "Deck: " + state.deck.length;
  const hudElement = document.querySelector("#hud");
  hudElement.innerHTML = html;
}

function renderRelicBelt(state) {
  let html = "";
  for (let relic of state.relicBelt) {
    html += "<div>";
    html += relic.name;
    html += "</div>";
  }
  document.querySelector("#relicBelt").innerHTML = html;
}

function renderPathSelection(oldState) {
  let state = { ...oldState };
  renderHud(state);
  renderRelicBelt(state);
  renderTitle(state);
  const options = state.presentedOptions;
  let html = "";
  for (const optionIndex in options) {
    const option = options[optionIndex];
    // styling buttons based on content - this needs fixing, currently doesn't work.
    html += '<button data-index="' + optionIndex + '">';
    html += option.name;
    html += "</button>";
  }
  const outputDiv = document.querySelector("#output");
  outputDiv.innerHTML = html;

  const btnElems = document.querySelectorAll("#output button");
  for (let btnElem of btnElems) {
    btnElem.addEventListener("click", () => {
      const name = btnElem.innerHTML;
      const clickedOption = options[btnElem.dataset.index];
      //check and see if it's a monster
      if (name != "Rest" && name != "Shop" && name != "Wand Upgrade") {
        console.log("currentEnemy = ", clickedOption);
        state.currentEnemy = clickedOption;
        startCombat(state);
      } else if (name == "Rest") {
        startRest(state);
      } else if (name == "Shop") {
        startShop(state);
      } else if (name == "Wand Upgrade") {
        startWandUpgrade(state);
      } else {
        throw "Unknown screen: " + state.currentScreen;
      }
    });
  }
}

function renderTitle(state) {
  const red = state.color.R;
  const green = state.color.G;
  const blue = state.color.B;
  const backgroundColor =
    "rgba(" + red + "," + green + "," + blue + "," + "0.7)";
  let title = document.querySelector("#titlecard");
  title.style.backgroundColor = backgroundColor;
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  if (luminance < 0.5) {
    title.style.color = "white";
  } else {
    title.style.color = "black";
  }
}

//placeholder functions for resting
function renderRest(state) {
  displayRest(() => {
    renderRelicBelt(state);
    renderHud(state);
    startPathSelection(state);
  });
}

function displayRest(callback) {
  let countdown = 3;
  //update HTML immediately to show initial countdown
  let html = "";
  html +=
    "<div style='border: 3px solid lightgreen; color: darkgreen; background-color: lightgreen; font-size: 50px; text-align: center; padding: 20px;'>";
  html += `Rest ${countdown}`;
  html += "</div>";
  document.querySelector("#output").innerHTML = html;
  // Start the interval for subsequent updates
  let countdownInterval = setInterval(() => {
    countdown--;
    if (countdown >= 0) {
      html = "";
      html +=
        "<div style='border: 3px solid lightgreen; color: darkgreen; background-color: lightgreen; font-size: 50px; text-align: center; padding: 20px;'>";
      html += `Rest ${countdown}`;
      html += "</div>";
      document.querySelector("#output").innerHTML = html;
    }
    if (countdown < 0.1) {
      clearInterval(countdownInterval);
      document.querySelector("#output").innerHTML =
        "<div style='border: 3px solid lightgreen; color: darkgreen; background-color: lightgreen; font-size: 50px; text-align: center; padding: 20px;'>Rest!</div>";
      if (callback) callback();
    }
  }, 1000);
}

//these are placeholder functions to simulate fighting.
function renderBattlefield(state) {
  displayBattlefield(() => {
    renderHud(state);
    renderRelicBelt(state);
    startRewardSelection(state);
  });
}
function displayBattlefield(callback) {
  let countdown = 3;
  //update HTML immediately to show initial countdown
  let html = "";
  html +=
    "<div style='border: 3px solid red; color: darkred; background-color: pink; font-size: 50px; text-align: center; padding: 20px;'>";
  html += `Fight ${countdown}`;
  html += "</div>";
  document.querySelector("#output").innerHTML = html;
  // Start the interval for subsequent updates
  let countdownInterval = setInterval(() => {
    countdown--;
    if (countdown >= 0) {
      html = "";
      html +=
        "<div style='border: 3px solid red; color: darkred; background-color: pink; font-size: 50px; text-align: center; padding: 20px;'>";
      html += `Fight ${countdown}`;
      html += "</div>";
      document.querySelector("#output").innerHTML = html;
    }
    if (countdown < 0.1) {
      clearInterval(countdownInterval);
      document.querySelector("#output").innerHTML =
        "<div style='border: 3px solid red; color: darkred; background-color: pink; font-size: 50px; text-align: center; padding: 20px;'>Fight!</div>";
      if (callback) callback();
    }
  }, 1000);
}

// Placeholder functions to simulate wand upgrade - chatGPT edition.
function renderWandUpgrade(state) {
  displayWandUpgrade(() => {
    renderRelicBelt(state); // Render relic belt after animation
    renderHud(state); // Render HUD after relic belt
    startPathSelection(state); // Start path selection after HUD
  });
}
function displayWandUpgrade(callback) {
  let countdown = 3;
  // Update HTML immediately to show initial countdown
  let html = "";
  html +=
    "<div style='border: 3px solid purple; color: white; background-color: darkorchid; font-size: 50px; text-align: center; padding: 20px;'>";
  html += `Wand Upgrade ${countdown}`;
  html += "</div>";
  document.querySelector("#output").innerHTML = html;
  // Start the interval for subsequent updates
  let countdownInterval = setInterval(() => {
    countdown--;
    if (countdown >= 0) {
      // Update HTML with the current countdown value
      html = "";
      html +=
        "<div style='border: 3px solid purple; color: white; background-color: darkorchid; font-size: 50px; text-align: center; padding: 20px;'>";
      html += `Wand Upgrade ${countdown}`;
      html += "</div>";
      document.querySelector("#output").innerHTML = html;
    }
    if (countdown < 0.1) {
      clearInterval(countdownInterval);
      document.querySelector("#output").innerHTML =
        "<div style='border: 3px solid purple; color: white; background-color: darkorchid; font-size: 50px; text-align: center; padding: 20px;'>Upgraded!</div>";
      if (callback) callback(); // Call the callback after the animation ends
    }
  }, 1000);
}

// Placeholder functions to simulate shop
function renderShop(state) {
  displayShop(() => {
    renderRelicBelt(state); // Render relic belt after animation
    renderHud(state); // Render HUD after relic belt
    startPathSelection(state); // Start path selection after HUD
  });
}
function displayShop(callback) {
  let countdown = 3;
  // Update HTML immediately to show initial countdown
  let html = "";
  html +=
    "<div style='border: 3px solid yellow; color: darkorange; background-color: lightyellow; font-size: 50px; text-align: center; padding: 20px;'>";
  html += `Shop ${countdown}`;
  html += "</div>";
  document.querySelector("#output").innerHTML = html;
  // Start the interval for subsequent updates
  let countdownInterval = setInterval(() => {
    countdown--;
    if (countdown >= 0) {
      // Update HTML with the current countdown value
      html = "";
      html +=
        "<div style='border: 3px solid yellow; color: darkorange; background-color: lightyellow; font-size: 50px; text-align: center; padding: 20px;'>";
      html += `Shop ${countdown}`;
      html += "</div>";
      document.querySelector("#output").innerHTML = html;
    }
    if (countdown < 0.1) {
      clearInterval(countdownInterval);
      document.querySelector("#output").innerHTML =
        "<div style='border: 3px solid yellow; color: darkorange; background-color: lightyellow; font-size: 50px; text-align: center; padding: 20px;'>Shopped!</div>";
      if (callback) callback(); // Call the callback after the animation ends
    }
  }, 1000);
}
