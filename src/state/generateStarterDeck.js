"use strict";
export function generateStarterDeck(state) {
  state = { ...state };
  if (state.difficultyLevel < 10) {
    state.deck = [];
  } else if (state.difficultyLevel < 15) {
    state.deck = [];
  } else {
    state.deck = [];
  }
  return state;
}
