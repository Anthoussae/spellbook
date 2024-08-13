"use strict";
import { startRewardSelection } from "../startRewardSelection";
import { renderHud } from "../../render/renderHud";
import { renderRelicBelt } from "../../render/renderRelicBelt";
import { checkEndCombatTriggers } from "./checkEndCombatTriggers";

export async function endCombat(oldState) {
  let state = { ...oldState };

  let outcome = "";
  if (state.currentEnemy.hp < 1) {
    outcome = "win";
  } else {
    outcome = "loss";
    if (state.hp <= 0) {
      alert("You Lose!");
      // this function is bugged.
      resetState(state);
    }
  }
  state.lastCombatResult = outcome;
  state = checkEndCombatTriggers(state, outcome);
  if (state.lastCombatResult == "win") {
    state.bounty = state.currentEnemy.goldReward;
  }
  state.lastBunnies = state.bunnies;
  state.lastEnemyHp = state.currentEnemy.hp;

  //clear enemy
  state.defeatedEnemies.push(state.currentEnemy);
  state.currentEnemy = null;

  //reset all combat values
  state.combatDeck = [];
  state.hand = [];
  state.combatMulligans = 0;
  state.combatInk = 0;
  state.combatPages = 0;
  state.bunnies = 0;
  state.combatHandSize = 0;
  state.casting = 0;

  //rerender
  document.querySelector("#output").innerHTML = "";
  renderHud(state);
  renderRelicBelt(state);
  startRewardSelection(state);
  return state;
}
