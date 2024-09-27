"use strict";
import { render } from "../../render/render";

//this function will set the game to its first state.
//ideally, choosing a mythic reward.

export function startMythicSelection(oldState) {
  let state = { ...oldState };
  if (state.currentScreen != "mythicSelection") {
    state.currentScreen = "mythicSelection";
    render(state);
  }
}
