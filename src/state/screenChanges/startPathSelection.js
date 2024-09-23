"use strict";
import { render } from "../../render/render";
import { populateOptions } from "../populateOptions.js";

export function startPathSelection(oldState) {
  let state = { ...oldState };
  state.level = state.level + 1;
  state.currentScreen = "pathSelection";
  state = populateOptions(state);
  render(state);
}
