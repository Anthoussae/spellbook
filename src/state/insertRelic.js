"use strict";
import { findObjectInArray } from "../util/findObjectInArray";
import { checkRelicPickupTriggers } from "./checkRelicPickupTriggers";

export function insertRelic(oldState, relicName) {
  let state = { ...oldState };
  let relic = findObjectInArray(state.relicPool, "name", relicName);
  state.relicBelt.push(relic);
  state.relicPool.splice(state.relicPool.indexOf(relic), 1);
  state = checkRelicPickupTriggers(state, relic);
  return state;
}
