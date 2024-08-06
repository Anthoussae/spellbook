"use strict";
import { applyColorTraits } from "./applyColorTraits";

export function colorize(oldState) {
  let state = { ...oldState };
  state.overallColor = getColorWord(state);
  state = applyColorTraits(state);
  return state;
}

// 1.5% of white, 25% black, 12.5% each other color
function getColorWord(state) {
  let R = state.color.R;
  let G = state.color.G;
  let B = state.color.B;
  if (R >= 128 && G <= 127 && B <= 127) {
    return "red";
  } else if (R <= 127 && G >= 128 && B <= 127) {
    return "green";
  } else if (R <= 127 && G <= 127 && B >= 128) {
    return "blue";
  } else if (R >= 128 && G >= 128 && B <= 127) {
    return "yellow";
  } else if (R <= 127 && G >= 128 && B >= 128) {
    return "cyan";
  } else if (R >= 128 && G <= 127 && B >= 128) {
    return "magenta";
  } else if (R >= 192 && G >= 192 && B >= 192) {
    return "white";
  } else {
    return "black";
  }
}
