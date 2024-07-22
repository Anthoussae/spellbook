"use strict";
import { render } from "../render/render";

export function startRest(state) {
  // utlimately, this function should provide at least three options: permanently upgrade wand // heal HP  // ink bonus next fight
  state = { ...state };
  state.currentScreen = "rest";
  state.hp = Math.min(state.hp + state.restHealAmount, state.maxHp);
  state.level = state.level + 1;
  render(state);
}
