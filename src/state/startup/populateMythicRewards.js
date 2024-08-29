"use strict";
import { pickN } from "../../util/pickN";

export function populateMythicRewards(oldState) {
  let state = { ...oldState };
  let mythicRewards = pickN(state.mythicPool, 3, { duplicatesAllowed: false });
  state.mythicRewards = mythicRewards;
  //state.mythicPool should have the selected 3 permanently removed.
  state.mythicPool = state.mythicPool.filter(
    (relic) => !mythicRewards.includes(relic)
  );
  console.log(state.mythicRewards);
  return state;
}
