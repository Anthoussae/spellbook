"use strict";
import { checkRelicPickupTriggers } from "./nonCombatTriggers/checkRelicPickupTriggers";

export function pickupRelic(oldstate, relic) {
  let state = { ...oldstate };
  state.relicBelt.push(relic);
  state = checkRelicPickupTriggers(state, relic);
  return state;
}
