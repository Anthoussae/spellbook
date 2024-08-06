"use strict";
import { render } from "../render/render";
import { startPathSelection } from "../state/startPathSelection";

export function startRest(state) {
  // utlimately, this function should provide at least three options: permanently upgrade wand // heal HP  // ink bonus next fight
  state = { ...state };
  state.currentScreen = "rest";
  let html = "REST " + state.hp;
  const outputDiv = document.querySelector("#output");
  outputDiv.innerHTML = html;
  setTimeout(() => {
    startPathSelection(state);
  }, 3000);
  state.hp = Math.min(state.hp + state.restHealAmount, state.maxHp);
  state.level = state.level + 1;
  render(state);
}
