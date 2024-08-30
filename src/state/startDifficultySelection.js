"use strict";
import { render } from "../render/render";
import { applyDifficultyLevel } from "./applyDifficultyLevel";

export function startDifficultySelection(oldState) {
  let state = { ...oldState };
  //assign logic to the difficulty buttons.
  let difficulties = ["easy", "normal", "hard"];
  for (let i = 0; i < difficulties.length; i++) {
    let difficulty = difficulties[i];
    // Get the button element by its id
    let button = document.getElementById(difficulty);
    button.addEventListener("click", function () {
      let bunnyOverlay = document.createElement("div");
      bunnyOverlay.className = "bunny-transition";
      document.body.appendChild(bunnyOverlay);

      bunnyOverlay.addEventListener("animationend", function () {
        // Hide all other divs and reveal the new game div
        document
          .querySelectorAll(".screen")
          .forEach((div) => (div.style.display = "none"));
        document.getElementById("mythicSelection").style.display = "flex";

        // Contract the bunny face
        bunnyOverlay.style.animation = "contract 1s forwards ease-in-out";

        bunnyOverlay.addEventListener("animationend", function () {
          document.body.removeChild(bunnyOverlay); // Remove the overlay after the animation
        });
      });
    });
    applyDifficultyLevel(button.dataset.value, state);
    console.log(state);
  }
  //render the difficulty screen.
  state.currentScreen = "difficultySelection";
  render(state);
}
