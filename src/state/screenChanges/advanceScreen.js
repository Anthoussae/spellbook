"use strict";
import { startDifficultySelection } from "./startDifficultySelection";
import { startMythicSelection } from "./startMythicSelection";
import { startPathSelection } from "./startPathSelection";

export function advanceScreen(oldState) {
  let state = { ...oldState };
  if (state.currentScreen === "startScreen") {
    startDifficultySelection(state);
  } else if (state.currentScreen === "difficultySelection") {
    startMythicSelection(state);
  } else if (state.currentScreen === "mythicSelection") {
    startPathSelection(state);
  }
}
