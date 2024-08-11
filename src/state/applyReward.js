"use strict";
import { insertRelic } from "./insertRelic";
import { drinkPotion } from "./drinkPotion";
import { insertCard } from "./insertCard";
import { renderSocketing } from "../render/renderSocketing";
import { render } from "../render/render";
import { startWandUpgrade } from "./startWandUpgrade";

export function applyReward(state) {
  state = { ...state };
  const reward = state.selectedReward;
  if (reward.type == "potion") {
    state = drinkPotion(state);
    return state;
  } else if (reward.type == "relic") {
    state = insertRelic(state, reward.name);
  } else if (reward.type == "card") {
    state = insertCard(state, reward);
  } else if (reward.type == "gem") {
    //initiate the socketing screen.
    state = renderSocketing(state);
  } else if (reward.type == "concrete" && reward.name == "Wand Upgrade") {
    state = startWandUpgrade(state);
  } else {
    throw "unknown startRewardSelection type" + reward.type;
  }
  //should it reset the reward?
  return state;
}
