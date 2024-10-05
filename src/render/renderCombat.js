"use strict";
import { renderHud } from "./renderHud";

export function renderCombat(state) {
  console.log("rendering combat", state);
  console.log("enemy", state.currentEnemy);
  document.getElementById("combatBannerElement").innerHTML =
    state.currentEnemy.name;
}
