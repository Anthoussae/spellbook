"use strict";
import { randomlyUpgradeXCards } from "../upgradeCard";

export function checkRelicPickupTriggers(oldState, selectedRelic) {
  let state = { ...oldState };
  let relic = selectedRelic;
  console.log("state at checkrelicpickup", state);
  if (relic.trigger === "pickup") {
    //hydrangea
    if (relic.bonusMaxHp) {
      state.previousMaxHp = state.maxHp;
      state.maxHp = state.maxHp + relic.bonusMaxHp;
      state.previousHp = state.hp;
      state.hp = state.hp + relic.bonusMaxHp;
    }
    // golden egg
    else if (relic.gold) {
      state.previousGold = state.gold;
      state.gold = state.gold + relic.gold;
    }
    // gaoler's keychain
    else if (relic.addKeys) {
      state.keys = state.keys + relic.addKeys;
    } else if (relic.randomUpgrade) {
      state = randomlyUpgradeXCards(state, relic.randomUpgrade);
    } else {
      console.log("Relic pickup trigger not found");
    }
    return state;
  }
  return state;
}
