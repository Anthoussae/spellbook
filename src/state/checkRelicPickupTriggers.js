"use strict";
export function checkRelicPickupTriggers(oldState, selectedRelic) {
  let state = { ...oldState };
  let relic = selectedRelic;
  if (relic.trigger === "pickup") {
    //hydrangea
    if (relic.bonusMaxHp) {
      state.maxHp = state.maxHp + relic.bonusMaxHp;
    }
  }
  return state;
}
