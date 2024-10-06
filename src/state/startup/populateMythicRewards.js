"use strict";
import { pickN } from "../../util/pickN";

export function populateMythicRewards(oldState) {
  let state = { ...oldState };
  console.log(state, "state at mythic rewards", state.mythicPool);

  let mythicRewards = pickN(state.mythicPool, 3, { duplicatesAllowed: false });
  state.mythicRewards = mythicRewards;
  //state.mythicPool should have the selected 3 permanently removed.
  state.mythicPool = state.mythicPool.filter(
    (relic) => !mythicRewards.includes(relic)
  );
  return state;
}
