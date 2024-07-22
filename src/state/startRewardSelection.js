"use strict";
import { rewardPool } from "../data/rewardPool";
import { render } from "../render/render";
import { filterArrayByLevel } from "../util/filterArrayByLevel";
import { pickN } from "../util/pickN";
import { rarifyArray } from "../util/rarifyArray";

export function startRewardSelection() {
  state = { ...state };
  state.currentScreen = "rewardSelection";
  const possibleRewardOptions = rarifyArray(
    filterArrayByLevel(rewardPool, state.rewardLuck, state.level)
  );
  state.presentedRewardOptions = pickN(possibleRewardOptions, 3);
  render(state);
}
