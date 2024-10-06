"use strict";

import { upgradeCard } from "../upgradeCard";

//may be bugged - not sure if it properly pushes the card into deck if there is no upgrade.
//check upgrade card function.
export function checkCardPickupTriggers(oldState, selectedCard) {
  let state = { ...oldState };
  let card = { ...selectedCard };
  //check triggers in cards and relics.
  let relics = state.relicBelt;
  for (let i = 0; i < relics.length; i++) {
    let relic = relics[i];
    if (relic.trigger == "cardAdd") {
      if (relic.upgradeCard) {
        state = upgradeCard(state, card);
      }
    }
  }
  return state;
}
