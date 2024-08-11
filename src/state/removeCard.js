"use strict";
import { findObjectInArray } from "../util/findObjectInArray";

export function removeCard(oldState, card) {
  let state = { ...oldState };
  // remove an exact match of the card object from the state.deck array;
  state.deck.splice(
    state.deck.indexOf(findObjectInArray(state.deck, "name", card.name)),
    1
  );
  return state;
}
