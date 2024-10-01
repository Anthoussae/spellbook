"use strict";
import { render } from "../../render/render";
import { populatePathOptions } from "../populatePathOptions.js";
import { applyLocks } from "../populatePathOptions.js";

export function startPathSelection(oldState) {
  let state = { ...oldState };
  state.level = state.level + 1;
  state.currentScreen = "pathSelection";
  //generate appropriate path options.
  const options = populatePathOptions(state);
  //apply locks.
  const lockedOptions = applyLocks(options, state);
  state.presentedOptions = lockedOptions;
  console.log("currentscreen", state.currentScreen);
  console.log("options", state.presentedOptions);
  render(state);
}
