"use strict";

//completely rewrite this using the challenge pool.

export function applyDifficultyLevel(oldState) {
  //ultimately, set difficulty level to pregame user selection.
  let state = { ...oldState };
  state = setRestHealAmount(state);
  state = setStarterRelic(state);
  return state;
}

function setRestHealAmount(oldState) {
  let state = { ...oldState };
  //heal amounts are adjusted based on difficulty level
  if (state.difficultyLevel < 7) {
    state.restHealAmount = state.restHealAmount + 10;
  } else if (state.difficultyLevel > 14) {
    state.restHealAmount = state.restHealAmount - 10;
  }
  //other difficulty level adjustments go here
  return state;
}

function setStarterRelic(oldState) {
  let state = { ...oldState };
  if (state.difficultyLevel > 10) {
    replaceRelic(state, "Magic Wand", "Broken Wand");
  }
  return state;
}
