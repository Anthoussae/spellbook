"use strict";
import { startMythicSelection } from "./startMythicSelection";

export function applyDifficultyLevel(difficulty, oldState) {
  let state = { ...oldState };
  console.log("difficulty set to: ", difficulty);
  state.difficulty = difficulty;
  //apply difficulty effects here.
  startMythicSelection(state);
}
