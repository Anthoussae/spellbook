"use strict";

export function checkRelicPickupTriggers(oldState, selectedRelic) {
  let state = { ...oldState };
  let relic = selectedRelic;
  if (relic.trigger === "pickup") {
    //hydrangea
    if (relic.bonusMaxHp) {
      state.maxHp = state.maxHp + relic.bonusMaxHp;
      state.hp = state.hp + relic.bonusMaxHp;
    }
    // golden egg
    else if (relic.gold) {
      state.gold = state.gold + relic.gold;
    }
  }
  return state;
}
