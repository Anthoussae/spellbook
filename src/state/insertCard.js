"use strict";

import { checkCardPickupTriggers } from "./nonCombatTriggers/checkCardPickupTriggers";

export function insertCard(oldState, card) {
  let state = { ...oldState };
  state.deck.push(card);
  state = checkCardPickupTriggers(state, card);
  return state;
}
