"use strict";
import { findObjectInArray } from "../util/findObjectInArray";

export function insertRelic(oldState, relicName) {
  let state = { ...oldState };
  let relic = findObjectInArray(state.relicPool, "name", relicName);
  state.relicBelt.push(relic);
  state.relicPool.splice(state.relicPool.indexOf(relic), 1);
  state = checkRelicPickupTriggers(state, relic);
  return state;
}

function checkRelicPickupTriggers(oldState, selectedRelic) {
  let state = { ...oldState };
  let relic = selectedRelic;
  if (relic.trigger === "pickup") {
    //hydrangea
    if (relic.effect === "+maxHp") {
      state.maxHp = state.maxHp + relic.bonusMaxHp;
    }
  }
  return state;
}
