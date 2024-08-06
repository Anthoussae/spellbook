"use strict";
import { findObjectInArray } from "../util/findObjectInArray";

export function replaceRelic(
  oldState,
  replacedRelicName,
  replacementRelicName
) {
  let state = { ...oldState };
  state.relicBelt.push(
    findObjectInArray(state.relicPool, "name", replacementRelicName)
  );
  state.relicPool.splice(
    state.relicPool.indexOf(
      findObjectInArray(state.relicPool, "name", replacementRelicName)
    ),
    1
  );
  state.relicBelt.splice(
    state.relicBelt.indexOf(
      findObjectInArray(state.relicBelt, "name", replacedRelicName)
    ),
    1
  );
  return state;
}
