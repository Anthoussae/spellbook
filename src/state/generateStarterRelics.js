"use strict";
import { findObjectInArray } from "../util/findObjectInArray";

export function generateStarterRelics(previousState) {
  state = { ...previousState };
  if (state.difficultyLevel < 15) {
    state.relicBelt.push(
      findObjectInArray(state.relicPool, "name", "Magic Wand")
    );
    state.relicPool.splice(
      state.relicPool.indexOf(
        findObjectInArray(state.relicPool, "name", "Magic Wand")
      ),
      1
    );
    return state;
  } else {
    state.relicBelt.push(
      findObjectInArray(state.relicPool, "name", "Broken Wand")
    );
    state.relicPool.splice(
      state.relicPool.indexOf(
        findObjectInArray(state.relicPool, "name", "Broken Wand")
      ),
      1
    );
    return state;
  }
}
