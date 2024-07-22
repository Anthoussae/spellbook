"use strict";
import { render } from "../render/render";
import { populateOptions } from "./populateOptions";

export function startPathSelection(previousState) {
  let state = { ...previousState };
  state.currentScreen = "pathSelection";
  state = populateOptions(state);
  render(state);
}
