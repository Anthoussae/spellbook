"use strict";
export function applyDifficultyLevel(state) {
  //ultimately, set difficulty level to pregame user selection.
  state = { ...state };
  state.difficultyLevel = 1;
  if (state.difficultyLevel < 10) {
    state.restHealAmount = state.restHealAmount + 10;
  } else if (state.difficultyLevel > 15) {
    state.restHealAmount = state.restHealAmount - 10;
  }
  return state;
}
