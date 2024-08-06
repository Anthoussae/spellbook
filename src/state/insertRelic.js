"use strict";
import { findObjectInArray } from "../util/findObjectInArray";

export function insertRelic(oldState, relicName) {
  let state = { ...oldState };
  state.relicBelt.push(findObjectInArray(state.relicPool, "name", relicName));
  state.relicPool.splice(
    state.relicPool.indexOf(
      findObjectInArray(state.relicPool, "name", relicName)
    ),
    1
  );
  return state;
}
