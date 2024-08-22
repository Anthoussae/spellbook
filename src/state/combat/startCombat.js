import { render } from "../../render/render.js";

import { drawXCards } from "./drawXCards.js";
import { checkStartCombatTriggers } from "./checkStartCombatTriggers.js";
import { updateCastBunnies } from "./updateCastBunnies.js";

// this function is a placeholder. Real combat mechanics need to be properly designed.
export function startCombat(oldState) {
  let state = { ...oldState };
  state.currentScreen = "combat";
  state = checkStartCombatTriggers(state);

  state.combatDeck = state.deck.map((card) => ({ ...card }));
  state.enemyHp = state.currentEnemy.maxHp;

  //assign combat values
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
