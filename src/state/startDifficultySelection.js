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
      applyDifficultyLevel(button.dataset.value, state);
      console.log(state);
    });
  }
  //render the difficulty screen.
  state.currentScreen = "difficultySelection";
  render(state);
}
