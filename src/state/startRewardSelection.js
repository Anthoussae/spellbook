"use strict";

import { render } from "../render/render";
import { populateOptions } from "./populateOptions";

export function startRewardSelection(oldState) {
  let state = { ...oldState };
  state.gold = state.gold + state.currentEnemy.goldReward;
  state.defeatedEnemies.push(state.currentEnemy);
  state.currentEnemy = null;
  state.currentScreen = "rewardSelection";
  state = populateOptions(state);
  render(state);
}
