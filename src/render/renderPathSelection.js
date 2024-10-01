"use strict";
import { paths } from "./render";

// //
// Currently, it's working OK (albeit a bit messy) but has four bugs.
// Firstly, the screen "judders" when you hover over a path option. This is likely because it's adjusting size, or the highlightedOption image is a different size, or similar. I want to absolutely stop the "juddering". Any suggestions would be very helpful.
// Secondly, when you hover over the image, it fades to invisible then reappears. I don't want that behavior.
// THirdly, when you stop hovering over an image, it should retiurn to its default, non-highlighted image. Instead, it's staying as its highlighted version.
// FOurtly, the top is slightly cropped when highlighted.
// also for some reason rest is smaller than shop and fight
// also, it's not forwards-compatible : if we add more paths, we need to add more logic to the renderPathSelection function.
// consider rewriting!

// the lock logic needs to be implemented - the image overlay, checking to see if an option is locked etc.
// the onclick logic also needs to be imported and implemented.

export function renderPathSelection(state) {
  let outputDiv = document.getElementById("pathSelectionOutput");
  let options = state.pathPool;

  let html = "";
  options.forEach((path, index) => {
    let imagePath = paths[path.pathImgName];
    html += renderPath(imagePath, path.name, index);
  });
  outputDiv.innerHTML = html;

  // Add hover effects for each path
  let pathOptions = document.querySelectorAll(".path-option");
  pathOptions.forEach((option) => {
    option.addEventListener("mouseenter", handleMouseEnter);
    option.addEventListener("mouseleave", handleMouseLeave);
  });
}

function handleMouseEnter(event) {
  let option = event.currentTarget;
  let imgElement = option.querySelector("img");
  let originalPath = imgElement.src;
  let pathName = imgElement.alt; // Use the alt attribute to get the name

  // Change image source to highlighted version
  let highlightedPath = "";
  if (pathName === "Rest") {
    highlightedPath = paths.highlightedRest;
  } else if (pathName === "Shop") {
    highlightedPath = paths.highlightedShop;
  } else {
    highlightedPath = paths.highlightedCombat;
  }

  console.log(highlightedPath);
  imgElement.classList.add("fade");

  setTimeout(() => {
    imgElement.src = highlightedPath;
    imgElement.classList.remove("fade");
  }, 300);
}

function handleMouseLeave(event) {
  let option = event.currentTarget;
  let imgElement = option.querySelector("img");
  let pathName = "";

  if (option.name === "Rest") {
    pathname = "rest";
  } else if (option.name === "Shop") {
    pathname = "shop";
  } else {
    pathname = "combat";
  }

  // Revert back to the original image
  let originalPath = paths[pathName];
  imgElement.classList.add("fade");

  setTimeout(() => {
    imgElement.src = originalPath;
    imgElement.classList.remove("fade");
  }, 300); // Match the CSS transition duration (0.3s)
}

// Utility function to capitalize the first letter of the name for camelCase.
function capitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function renderPath(imagePath, name, index) {
  return `
    <div class="path-image path-option" data-index="${index}"> 
      <img class="path-image" src="${imagePath}" alt="${name}" />
      <div class="path-name">${name}</div>
    </div>
  `;
}
