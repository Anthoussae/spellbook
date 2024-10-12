"use strict";
import { cardBacks, spellIcons } from "./render";

export function renderCard(card, location) {
  const cardBack = cardBacks[card.color] || cardBacks["misc"];
  const cardIcon = spellIcons[card.imgName] || spellIcons["misc"];

  // Determine font size based on card name length
  const maxFontSize = 20; // Default font size for names with <= 12 characters
  const minFontSize = 12; // Minimum font size
  const nameLength = card.name.length;
  const fontSize =
    nameLength > 12
      ? Math.max(minFontSize, maxFontSize - (nameLength - 12) * 0.5) // Decrease font size as name length increases
      : maxFontSize;

  // Effect text size (2 points smaller than the card name, minimum of 12px)
  const effectFontSize = Math.max(12, fontSize - 2);

  // Set name color based on whether the card is upgraded
  const nameColor = card.upgrade ? "purple" : "black";

  let inkCost = "";
  if (card.ink) {
    inkCost = card.ink;
  }

  let inkColor = "black";
  let typeColor = "black";

  if (card.trigger === "instant") {
    typeColor = "white";
  }

  // Handle card text to include colors corresponding to upgrades.
  let numberColor = "black";
  let cardText = "";
  if (card.upgrade) {
    if (card.upgrade > 0) {
      numberColor = "lightgreen";
    } else if (card.upgrade < 0) {
      numberColor = "red";
    }
  }

  if (card.trigger === "instant") {
    cardText += "Instant. ";
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

  return `
    <div class="card" style="display: flex; flex-direction: column; width: 181px; height: 265px; margin: 0.5%; text-align: center; border-radius: 8px;">
      <!-- Card back with shadow -->
      <img src="${cardBack}" alt="${card.name}" style="height: 100%; width: 100%; border-radius: 8px; filter: drop-shadow(-4px 4px 8px rgba(0, 0, 0, 0.2));">
      
      <!-- Card name overlay with dynamic font size and wider box -->
      <div class="card-name-overlay" style="position: absolute; top: 8%; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0); color: ${nameColor}; padding: 4px 16px; border-radius: 4px; font-size: ${fontSize}px; font-weight: bold; min-width: 200px; text-align: center;">
        ${card.name}
      </div>
    
      <!-- Instant card icon overlay -->
      

      <!-- Card effect text below card name -->
      <div class="card-effect-overlay" style="position: absolute; top: 18%; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0); color: black; padding: 4px 16px; font-size: ${effectFontSize}px; min-width: 200px; text-align: center;">
        ${cardText}
      </div>

      <!-- Spell icon below card effect (without shadow) -->
      <div class="card-icon-overlay" style="position: absolute; top: 22%; left: 50%; transform: translateX(-50%);">
        <img src="${cardIcon}" alt="${card.name} icon" style="width: 220px; height: 200px;">
      </div>

      <!-- Ink cost below the spell icon with dynamic color -->
      <div class="card-ink-overlay" style="position: absolute; top: 75%; left: 50%; transform: translateX(-50%); color: ${inkColor}; font-size: 40px; font-weight: bold;">
        ${inkCost}
      </div>

      <!-- Tooltip for card -->
      <span class="tooltiptext" style="visibility: hidden; background-color: rgba(0, 0, 0, 0.8); color: white; padding: 8px; border-radius: 6px; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); white-space: nowrap;">
        <strong style="font-size: 16px;">${card.name}</strong><br>
        ${card.effect}
      </span>
    </div>
  `;
}
