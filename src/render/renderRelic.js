"use strict";

export function renderRelic(
  imagePath,
  relicName,
  index,
  relicEffect,
  supertype = "",
  bunnyAdd = null,
  rarity = "basic", // Default rarity is "basic"
  location = "bag" // Default location is "bag"
) {
  let html = "";
  let tooltipText = `<em>${relicEffect}</em>`; // Default tooltip text

  // Handle tooltip text for wands
  if (supertype === "wand" && bunnyAdd !== null) {
    let bunnyAddColor = bunnyAdd > 0 ? "lightgreen" : "red";
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

  html += `<div class="tooltip relic-container ${location}" style="position: relative;">
        <img src="${imagePath}" alt="${relicName}" class="relic-image" data-index="${index}" style="display: block;">
        <span class="tooltiptext ${location}" style="position:absolute;" >
          <strong style="font-size: 20px; color: ${rarityColor};">${relicName}</strong><br>
          <em>-------------------</em><br>
          ${tooltipText}
        </span>
      </div>
    `;

  return html;
}
