"use strict";
import { startDifficultySelection } from "./startDifficultySelection";
import { startMythicSelection } from "./startMythicSelection";
import { startPathSelection } from "./startPathSelection";
import { startRest } from "./startRest";
import { startShop } from "./startShop";
import { startCombat } from "./startCombat";

export function advanceScreen(oldState) {
  let state = { ...oldState };
  if (state.currentScreen === "startScreen") {
    startDifficultySelection(state);
  } else if (state.currentScreen === "difficultySelection") {
    startMythicSelection(state);
  } else if (state.currentScreen === "mythicSelection") {
    startPathSelection(state);
  } else if (state.currentScreen === "pathSelection") {
    if (state.selectedPath.pathType === "rest") {
      startRest(state);
    } else if (state.selectedPath.pathType === "shop") {
      startShop(state);
    } else if (state.selectedPath.pathType === "combat") {
      startCombat(state);
    }
  }
}
