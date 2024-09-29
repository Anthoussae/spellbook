"use strict";
import { render } from "../../render/render";
import { populateOptions } from "../populateOptions.js";
import { populatePathOptions } from "../populatePathOptions.js";

export function startPathSelection(oldState) {
  let state = { ...oldState };
  state.level = state.level + 1;
  state.currentScreen = "pathSelection";
  const options = populatePathOptions(state);
  // state = populateOptions(state);
  state.presentedOptions = options;
  console.log("currentscreen", state.currentScreen);
  console.log("options", state.presentedOptions);
  render(state);
}

//logic for populating options must be established.
