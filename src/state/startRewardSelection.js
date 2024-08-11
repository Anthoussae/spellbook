"use strict";

import { render } from "../render/render";
import { populateOptions } from "./populateOptions";

export function startRewardSelection(oldState) {
  let state = { ...oldState };
  if (state.level > 20) {
    alert("You have reached the end of the game. Congratulations!");
  }
  state.currentScreen = "rewardSelection";
  state = populateOptions(state);
  render(state);
}
