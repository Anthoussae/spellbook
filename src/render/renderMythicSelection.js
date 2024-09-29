"use strict";
import { relicImages } from "./render";
import { pickupRelic } from "../state/pickupRelic";
import { advanceScreen } from "../state/screenChanges/advanceScreen";
import { renderRelic } from "./renderRelic";

export function renderMythicSelection(state) {
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

      // Hide the tooltip of the clicked relic immediately
      const tooltip = imgElem.parentElement.querySelector(".tooltiptext");
      tooltip.style.opacity = "0"; // Optional: Use display: none if you want it to disappear immediately without fading

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
export function animateRelicToBag(relicElem, bagElem, state, selectedRelic) {
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
    advanceScreen(state);
  });
}
