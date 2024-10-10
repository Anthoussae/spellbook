"use strict";

import { render } from "../../render/render";
import { generateBuffs } from "../combat/generateBuffs.js";

import { drawXCards } from "../combat/drawXCards.js";
// import { checkStartCombatTriggers } from "../combat/checkStartTurnTriggers.js";
import { checkStartTurnTriggers } from "../combat/checkStartTurnTriggers.js";
import { updateCastBunnies } from "../combat/updateCastBunnies.js";
import { applyBuffEffects } from "../combat/applyBuffEffects.js";

export function startCombat(oldState) {
  let state = { ...oldState };
  //some of this should happen at start of turn.
  //set the enemy
  state.currentEnemy = state.selectedPath;
  state.selectedPath = null;
  state.currentScreen = "combat";

  //generate buffs to the enemy
  state.currentEnemy = generateBuffs(state.currentEnemy);

  //set the temp deck for combat
  state.combatDeck = state.deck.map((card) => ({ ...card }));
  state.enemyHp = state.currentEnemy.hp;

  //assign the temp combat values
  state.shield = 0;

  //apply buff effects.
  state = applyBuffEffects(state, "start");

  state = startTurn(state);
  //clear bonus bunnies
  state.bonusBunnies = 0;
  state = updateCastBunnies(state);

  render(state);
}

//important function, to sepaate out the startcombat and start turn, currently untested
export function startTurn(oldState) {
  let state = { ...oldState };

  //assign combat values
  state.combatInk = state.combatInk + state.ink;
  state.combatMulligans = state.combatMulligans + state.mulligans;
  state.combatPages = state.combatPages + state.pages;
  state.bunnies = state.bunnies + state.bonusBunnies;
  state.combatHandSize = state.handSize + state.combatHandSize;

  //check relics
  state = checkStartTurnTriggers(state);

  //ensure minimums - must be done at start of turn too.
  if (state.combatHandSize < 1) {
    state.combatHandSize = 1;
  }
  if (state.combatPages < 1) {
    state.combatPages = 1;
  }
  if (state.combatInk < 1) {
    state.combatInk = 1;
  }
  //prepare pages
  state.spellbook = [];
  for (let i = 0; i < state.combatPages; i++) {
    state.spellbook.push("page");
  }
  //draw hand
  state = drawXCards(state, state.combatHandSize);

  return state;
}
