"use strict";
import { castSpell } from "./castSpell";
import { checkCastTriggers } from "./checkCastTriggers";

export function updateCastBunnies(oldState) {
  let state = { ...oldState };
  let dummyState = { ...oldState };

  let bunnyCount = dummyState.bunnies;
  dummyState = checkCastTriggers(dummyState);
  let spellbook = dummyState.spellbook;
  for (let i = 0; i < spellbook.length; i++) {
    let card = spellbook[i];
    dummyState = castSpell(dummyState, card);
  }
  bunnyCount = Math.floor(dummyState.bunnies);

  state.castBunnies = bunnyCount;
  return state;
}
