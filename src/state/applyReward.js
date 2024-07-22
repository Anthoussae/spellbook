"use strict";

export function applyReward(option, state) {
  state = { ...state };
  if (option.type == "potion") {
    state.hp = Math.min(state.hp + (option.hpHeal || 0), state.maxHp);
    state.gold = state.gold + (option.goldReward || 0);
    return state;
  } else if (option.type == "relic") {
    // move the selected option from the relic pool to the relic belt.
  } else if (option.type == "card") {
    // add a copy of the selected option to your deck
  } else if (option.type == "gem") {
    // launches the subscreen where you can peruse your deck and select 1 card for an effect (removal or upgrade)
  } else {
    throw "unknown startRewardSelection type" + option.type;
  }
}
