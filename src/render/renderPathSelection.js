"use strict";
import { paths } from "./render";
import { advanceScreen } from "../state/screenChanges/advanceScreen";
import { renderHud } from "./renderHud";

//currently stopgap behavior: desired behavior uses highlighted images as follows
//in order to use two different images for path (highlighted and unselected),
//use two images in the same div
//both positioned absolutely in the exact same palce
//on hover (in css) transition the opacity from 1 to 0 and from 0 to 1 respectively
//events are on the div that surrounds them, not on the images
//if you scale the images, make sure you do both

export function renderPathSelection(state) {
  let outputDiv = document.getElementById("pathSelectionOutput");
  let options = state.presentedOptions;
  console.log("options", options);
  let html = "";
  options.forEach((path, index) => {
    const imagePath = paths[path.pathType];
    const highlightedImagePath = paths["highlighted" + path.pathType];
    const lockedOverlay = paths["locked"];
    const hp = path.hp ? ` (${path.hp} HP)` : "";
    const monsterClass = path.monsterClass ? path.monsterClass : "";
    html += renderPath(
      imagePath,
      highlightedImagePath,
      path.name,
      index,
      path.pathType,
      path.locked,
      lockedOverlay,
      hp,
      monsterClass
    );
  });
  outputDiv.innerHTML = html;

  //add a click listener to each path option. the listener will set the current path to the selected path and advance the screen to the next screen.
  const pathOptions = document.querySelectorAll(".path-option");
  pathOptions.forEach((pathOption) => {
    const referencedOption = state.presentedOptions[pathOption.dataset.index];
    pathOption.addEventListener("click", () => {
      state.selectedPath = structuredClone(referencedOption);
      advanceScreen(state);
    });
  });

  // Add event listeners to the locks
  const lockedOverlays = document.querySelectorAll(".locked-overlay");
  lockedOverlays.forEach((lockedOverlay) => {
    const overlayIndex = parseInt(lockedOverlay.classList[1]);
    console.log("overlayIndex", overlayIndex);
    lockedOverlay.addEventListener("click", (event) => {
      // Stop event propagation so clicking on the lock doesn't trigger the path selection click
      event.stopPropagation();

      if (state.keys > 0) {
        // Remove the lock by hiding the overlay
        lockedOverlay.style.display = "none";
        document
          .querySelector(`.path-optionlocked[data-index="${overlayIndex}"]`)
          .classList.replace("path-optionlocked", "path-option");
        //add the click function. This is a bit of a hack - testing.
        document
          .querySelector(`.path-option[data-index="${overlayIndex}"]`)
          .addEventListener("click", () => {
            state.selectedPath = structuredClone(
              state.presentedOptions[overlayIndex]
            );
            advanceScreen(state);
          });

        // Decrease the number of keys
        state.keys -= 1;

        // Optionally, update the display of remaining keys (if needed in your UI)
        renderHud(state);
      } else {
        //flash the hud red briefly if no keys are left
        document.querySelector(".keys").style.transition =
          "background-color 0.3s ease";
        document.querySelector(".keys").style.backgroundColor =
          "rgba(255, 0, 0, 0.5)"; // Flash red
        setTimeout(() => {
          document.querySelector(".keys").style.backgroundColor =
            "rgba(1, 0, 0, -0.5)"; // Reset to original color
        }, 500);
        // Flash the lock red briefly if no keys are left
        lockedOverlay.style.transition = "background-color 0.3s ease";
        lockedOverlay.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // Flash red
        setTimeout(() => {
          lockedOverlay.style.backgroundColor = "rgba(1, 0, 0, -0.5)"; // Reset to original color
        }, 500);
      }
    });
  });
}

function renderPath(
  imagePath,
  highlightedImagePath,
  name,
  index,
  pathType,
  locked,
  lockedOverlay,
  hp,
  monsterClass
) {
  let html = "";
  if (!locked) {
    html += `
    <div class="path-option" data-index="${index}"> 
      <div class="image-wrapper">`;
  } else if (locked) {
    html += `
    <div class="path-optionlocked" data-index="${index}"> 
      <div class="image-wrapper">`;
  }
  html += `<img class="path-image  ${pathType}" src="${imagePath}" alt="${name}" pathtype="${pathType}" />`;
  if (locked) {
    html += `<img class="locked-overlay ${index}" src="${lockedOverlay}"></div>`;
  }
  html += `<img class="path-image highlighted-image" src="${highlightedImagePath}" alt="${name}" style="display: none"/>`;
  if (!pathType === "combat") {
    html += `<div class="path-name">${name}</div>`;
  } else {
    html += `<div class="path-name">${name}${hp}</div>`;
    html += `<div class="path-name">${monsterClass}</div>`;
  }
  html += `</div>
    </div>
  `;
  return html;
}

// //add a function on mouseover to highlight the image

// function mouseOverPath(event) {
//   const pathOption = event.target.closest(".path-option");
//   const highlightedImage = pathOption.querySelector(".highlighted-image");
//   const baseImage = pathOption.querySelector(".base-image");
//   baseImage.style.display = "none";
//   highlightedImage.style.display = "block";
// }

// function mouseOutPath(event) {
//   const pathOption = event.target.closest(".path-option");
//   const highlightedImage = pathOption.querySelector(".highlighted-image");
//   const baseImage = pathOption.querySelector(".base-image");
//   baseImage.style.display = "block";
//   highlightedImage.style.display = "none";
// }
