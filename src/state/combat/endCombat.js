"use strict";
import { startRewardSelection } from "../startRewardSelection";
import { renderHud } from "../../render/renderHud";
import { renderRelicBelt } from "../../render/renderRelicBelt";
import { checkEndCombatTriggers } from "./checkEndCombatTriggers";

export function endCombat(oldState) {
  let state = { ...oldState };

  let outcome = "";
  if (state.currentEnemy.hp < 1) {
    outcome = "win";
    console.log("state.currentEnemy.hp", state.currentEnemy.hp);
  } else {
    outcome = "loss";
    if (state.hp <= 0) {
      alert("You Lose!");
      // this function is bugged.
      resetState(state);
    }
  }

  state = checkEndCombatTriggers(state, outcome);

  if (outcome === "win") {
    state.gold = state.gold + state.currentEnemy.goldReward;
    console.log("you win! gold reward: ", state.currentEnemy.goldReward);
  }

  //clear enemy
  state.defeatedEnemies.push(state.currentEnemy);
  state.currentEnemy = null;

  //reset all combat values
  state.combatDeck = [];
  state.hand = [];
  state.combatMulligans = 0;
  state.combatInk = 0;
  state.combatPages = 0;

  //rerender
  document.querySelector("#output").innerHTML = "";
  renderHud(state);
  renderRelicBelt(state);
  startRewardSelection(state);
  return state;
}
