"use strict";

import { checkCardPickupTriggers } from "./nonCombatTriggers/checkCardPickupTriggers";

export function insertCard(oldState, oldCard) {
  let state = { ...oldState };
  let card = { ...oldCard };
  state = checkCardPickupTriggers(state, card);
  return state;
}
