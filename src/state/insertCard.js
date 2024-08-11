"use strict";
export function insertCard(oldState, card) {
  let state = { ...oldState };
  state.deck.push(card);
  return state;
}
