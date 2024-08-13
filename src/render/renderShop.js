"use strict";
import { startPathSelection } from "../state/startPathSelection";
import { renderHud } from "./renderHud";
import { renderRelicBelt } from "./renderRelicBelt";
import { drinkPotion } from "../state/drinkPotion";
import { pickupRelic } from "../state/pickupRelic";
import { insertCard } from "../state/insertCard";
import { renderButtons } from "./renderButtons";
import { renderSocketing } from "./renderSocketing";

// Placeholder functions to simulate shop
//lets completely rewrite it.
export function renderShop(state) {
  renderHud(state);
  renderRelicBelt(state);
  const outputDiv = document.getElementById("output");

  // Clear previous content
  outputDiv.innerHTML = "";

  // Create the shop container
  const shopContainer = document.createElement("div");
  shopContainer.className = "shop-container";

  // Create the shop title
  const shopTitle = document.createElement("div");
  shopTitle.className = "shop-title";
  shopTitle.textContent = "Shop";
  shopContainer.appendChild(shopTitle);

  // Create the items grid
  const shopItems = document.createElement("div");
  shopItems.className = "shop-items";

  // Define the row-specific functions (you can customize these)
  const rowFunctions = [
    //potions
    (item) => {
      (state.selectedReward = item),
        console.log("drinking: ", item.name),
        (state = drinkPotion(state)),
        renderHud(state),
        (state.selectedReward = null);
    },
    //relics
    (item) => {
      state = pickupRelic(state, item);
      renderHud(state);
      renderRelicBelt(state);
    },
    //cards
    (item) => {
      state = insertCard(state, item);
      renderHud(state);
      renderButtons(state);
    },
    //gems
    (item) => {
      state.selectedReward = item;
      renderSocketing(state);
    },
  ];

  // Loop through each row of shopwares
  state.shopWares.forEach((row, rowIndex) => {
    row.forEach((item) => {
      const itemButton = document.createElement("button");
      itemButton.className = "shop-item";
      itemButton.textContent = `${item.name} `;
      if (item.type == "card") {
        itemButton.textContent += ` ~ Ink: ${item.ink} `;
      }
      itemButton.textContent += `(${item.price} gold)`;

      // Add a tooltip to show the item effect
      const tooltip = document.createElement("span");
      tooltip.className = "tooltip-text";
      tooltip.textContent = item.effect;

      // // Show tooltip on hover
      itemButton.addEventListener("mouseover", () => {
        tooltip.style.visibility = "visible";
      });

      itemButton.appendChild(tooltip);

      // Hide tooltip when not hovering
      itemButton.addEventListener("mouseout", () => {
        tooltip.style.visibility = "hidden";
      });

      // Disable the button if the item is sold out
      if (item.soldOut) {
        itemButton.textContent = "SOLD OUT";
        itemButton.style.backgroundColor = "grey";
        itemButton.style.pointerEvents = "none";
      }

      // Add onclick function
      itemButton.addEventListener("click", () => {
        if (state.gold < item.price) {
          alert("Not enough gold");
          itemButton.style.backgroundColor = "red"; // Item too expensive
        } else {
          // Deduct the item price from the gold
          state.gold -= item.price;
          renderHud(state);
          // Call the function corresponding to the row
          rowFunctions[rowIndex](item);
          //marked as sold out in state
          item.soldOut = true;
          if (item.soldOut) {
            itemButton.textContent = "SOLD OUT";
            itemButton.style.backgroundColor = "grey";
            itemButton.style.pointerEvents = "none";
          }
        }
      });

      shopItems.appendChild(itemButton);
    });
  });

  shopContainer.appendChild(shopItems);

  // Create the exit button
  const exitButton = document.createElement("button");
  exitButton.className = "exit-button";
  exitButton.textContent = "Exit Shop";

  // Add click event to exit button
  exitButton.addEventListener("click", () => {
    outputDiv.innerHTML = ""; // Clears the shop
    startPathSelection(state);
  });

  shopContainer.appendChild(exitButton);

  // Append the shop container to the output div
  outputDiv.appendChild(shopContainer);
}
