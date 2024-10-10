"use strict";
export function checkCastTriggers(oldState) {
  let state = { ...oldState };
  let relics = state.relicBelt;
  for (let i = 0; i < relics.length; i++) {
    let relic = relics[i];
    if (relic.trigger === "cast") {
      //Magic Staff
      if (relic.effect === "bunnyMult") {
        state.bunnies = Math.floor(state.bunnies * relic.bunnyMult);
      }
    }
  }
  return state;
}
