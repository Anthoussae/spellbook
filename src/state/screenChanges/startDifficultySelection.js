"use strict";
import { render } from "../../render/render";
import { startMythicSelection } from "./startMythicSelection";

//this function is mixed, including some rendering features.
//it is also bugged, as the difficulty buttons call the "render" function twice, with a delay. This is causing problems elsewhere and should be fixed as a priority.
//the function that assigns logic to the difficulty buttons.

export function startDifficultySelection(oldState) {
  let state = { ...oldState };
  console.log("calling startDifficultySelection");
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

      const onAnimationEnd = function () {
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
        console.log(
          "about to call startMythicSelection() from startDifficultySelection()"
        );
        startMythicSelection(state); //when start mythic is here,
        bunnyOverlay.removeEventListener("animationend", onAnimationEnd);
      };
      bunnyOverlay.addEventListener("animationend", onAnimationEnd);
      state = applyDifficultyLevel(button.dataset.value, state);
    });
  }
  state.currentScreen = "difficultySelection";
  render(state);
}

function applyDifficultyLevel(difficulty, oldState) {
  let state = { ...oldState };
  console.log("difficulty set to: ", difficulty);
  state.difficulty = difficulty;
  //apply difficulty settings here.
  //PLACEHOLDER- MERGE WIWTH STARTUP/APPLYDIFFICULTYLEVEL
  if (difficulty === "easy") {
    state.maxHp = state.maxHp + 50;
    state.hp = state.hp + 50;
    state.gold = state.gold + 50;
    state.previousGold = state.gold;
    state.previousMaxHp = state.maxHp;
    state.previousHp = state.hp;
    // state.previousGold = 150;
    // state.previousMaxHp = 150;
    // state.previousHp = 150;
  }
  console.log(state);
  return state;
}
