import { render } from "../../render/render.js";
import { renderHud } from "../../render/renderHud.js";
import { drawXCards } from "./drawXCards.js";
import { findObjectInArray } from "../../util/findObjectInArray.js";
import { checkStartCombatTriggers } from "./checkStartCombatTriggers.js";

// this function is a placeholder. Real combat mechanics need to be properly designed.
export async function startCombat(oldState) {
  let state = { ...oldState };
  state.currentScreen = "combat";
  state = await checkStartCombatTriggers(state);

  state.spellbook = [];
  for (let i = 0; i < state.pages; i++) {
    state.spellbook.push("page");
  }
  console.log("deck", state.deck);
  state.combatDeck = state.deck.map((card) => ({ ...card }));
  state.enemyHp = state.currentEnemy.maxHp;

  //assign combat values
  state.combatPages = state.combatPages + state.pages;
  state.combatInk = state.combatInk + state.ink;
  state.combatMulligans = state.combatMulligans + state.mulligans;
  state.combatPages = state.combatPages + state.pages;
  state.bunnies = state.bunnies + state.bonusBunnies;
  state.combatHandSize = state.handSize + state.combatHandSize;

  //draw hand
  state = drawXCards(state, state.combatHandSize);

  //clear bonus bunnies
  state.bonusBunnies = 0;

  render(state);
}
