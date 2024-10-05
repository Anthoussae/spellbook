"use strict";

import { render } from "../../render/render";

import { drawXCards } from "../combat/drawXCards.js";
import { checkStartCombatTriggers } from "../combat/checkStartCombatTriggers.js";
import { updateCastBunnies } from "../combat/updateCastBunnies.js";

export function startCombat(oldState) {
  let state = { ...oldState };

  //set the enemy
  state.currentEnemy = state.selectedPath;
  state.selectedPath = null;
  state.currentScreen = "combat";

  //check relics
  state = checkStartCombatTriggers(state);

  //set the temp deck for combat
  state.combatDeck = state.deck.map((card) => ({ ...card }));
  state.enemyHp = state.currentEnemy.maxHp;

  //assign the temp combat values
  state.combatInk = state.combatInk + state.ink;
  state.combatMulligans = state.combatMulligans + state.mulligans;
  state.combatPages = state.combatPages + state.pages;
  state.bunnies = state.bunnies + state.bonusBunnies;
  state.combatHandSize = state.handSize + state.combatHandSize;

  console.log(state.pages, state.combatPages);
  //prepare pages
  state.spellbook = [];
  for (let i = 0; i < state.combatPages; i++) {
    state.spellbook.push("page");
  }
  //draw hand
  state = drawXCards(state, state.combatHandSize);

  //clear bonus bunnies
  state.bonusBunnies = 0;
  state = updateCastBunnies(state);

  render(state);
}
