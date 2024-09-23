"use strict";

export function advanceScreen(oldState) {
  let state = { ...oldState };
  if (state.currentScreen === "mythicSelection") {
    renderPathSelection(state);
  } else {
    console.log("Error: advanceScreen called from an invalid screen.");
  }
}
