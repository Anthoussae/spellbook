"use strict";
import { relicImages, showScreen } from "./render";
import { resumeGame } from "./render";

export function renderBagExamine(state) {
  let bag = state.relicPool;
  let outputDiv = document.getElementById("bagExamineOutput");
  // document.getElementById("blueCarpetBackground").style.display = "block";

  // Display bag items
  outputDiv.style.display = "grid";
  outputDiv.style.gridTemplateColumns = "repeat(7, 1fr)";
  outputDiv.style.gap = "10px";

  let html = "";
  bag.forEach((relic, index) => {
    let imagePath = relicImages[relic.imgName];
    html += renderRelic(
      imagePath,
      relic.name,
      index,
      relic.effect,
      relic.supertype,
      relic.bunnyAdd,
      relic.rarity
    );
  });

  outputDiv.innerHTML = html;

  if (!["bagExamine", "deckExamine"].includes(state.currentScreen)) {
    state.previousScreen = state.currentScreen;
  }

  state.currentScreen = "bagExamine";
  console.log("bag examine", state.currentScreen);
  showScreen(state.currentScreen); // Display the correct screen

  const resumeButton = document.getElementById("bag-resume-button");

  // Clear any existing listener, referencing the named function directly
  const resumeClick = () => resumeGame(state);

  resumeButton.removeEventListener("click", resumeClick);
  resumeButton.addEventListener("click", resumeClick, { once: true });
}

function renderRelic(
  imagePath,
  relicName,
  index,
  relicEffect,
  supertype = "",
  bunnyAdd = null,
  rarity = "basic" // Default rarity is "basic"
) {
  let html = "";
  let tooltipText = `<em>${relicEffect}</em>`; // Default tooltip text

  // Handle tooltip text for wands
  if (supertype === "wand" && bunnyAdd !== null) {
    let bunnyAddColor = bunnyAdd > 0 ? "green" : "red";
    tooltipText = `When you cast, gain <span style="color: ${bunnyAddColor};">${bunnyAdd}</span> bonus bunnies.`;
  }

  // Determine the color based on rarity
  let rarityColor =
    {
      mythic: "goldenrod",
      rare: "lightpurple", // Using a valid color
      uncommon: "lightgreen",
      common: "lightblue",
      basic: "white",
    }[rarity.toLowerCase()] || "white"; // Default to white if rarity is invalid

  html += `<div class="tooltip relic-container" style="position: relative;">
        <img src="${imagePath}" alt="${relicName}" class="relic-image" data-index="${index}" style="display: block;">
        <span class="tooltiptext" style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);">
          <strong style="font-size: 22px; color: ${rarityColor};">${relicName}</strong><br>
          <em>-------------------</em><br>
          ${tooltipText}
        </span>
      </div>
    `;

  return html;
}
