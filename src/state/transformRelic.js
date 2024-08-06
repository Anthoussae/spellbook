"use strict";

export function transformRelic(oldState, oldRelic, newRelic) {
  let state = { ...oldState };
  state.relicBelt.push(newRelic);
  state.relicBelt.splice(state.relicBelt.indexOf(oldRelic), 1);
  return state;
}
