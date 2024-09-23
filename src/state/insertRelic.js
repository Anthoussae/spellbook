"use strict";
import { findObjectInArray } from "../util/findObjectInArray";
import { checkRelicPickupTriggers } from "./nonCombatTriggers/checkRelicPickupTriggers";

//finds a relic in the relic pool, pushes it onto the relic belt, and removes it from the relic pool.
export function insertRelic(oldState, relicName) {
  let state = { ...oldState };
  let relic = findObjectInArray(state.relicPool, "name", relicName);
  state.relicBelt.push(relic);
  state.relicPool.splice(state.relicPool.indexOf(relic), 1);
  state = checkRelicPickupTriggers(state, relic);
  return state;
}
