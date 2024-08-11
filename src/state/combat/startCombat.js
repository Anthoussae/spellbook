import { render } from "../../render/render.js";
import { renderHud } from "../../render/renderHud.js";
import { drawXCards } from "./drawXCards.js";
import { findObjectInArray } from "../../util/findObjectInArray.js";
import { checkStartCombatTriggers } from "./checkStartCombatTriggers.js";

// this function is a placeholder. Real combat mechanics need to be properly designed.
export function startCombat(oldState) {
  let state = { ...oldState };
  state.currentScreen = "combat";
  state = checkStartCombatTriggers(state);
  state.spellbook = [];
  for (let i = 0; i < state.pages; i++) {
    state.spellbook.push("page");
  }
  state.combatDeck = state.deck.map((card) => ({ ...card }));
  state.enemyHp = state.currentEnemy.maxHp;
  //this function appears to be transforming state.deck. It should not.
  state = drawXCards(state, state.startingHandSize);

  //assign combat values
  state.combatPages = state.combatPages + state.pages;
  state.combatInk = state.combatInk + state.ink;
  state.combatMulligans = state.combatMulligans + state.mulligans;
  state.combatPages = state.combatPages + state.pages;

  state.bunnies =
    state.bunnies +
    state.bonusBunnies +
    findObjectInArray(state.relicBelt, "supertype", "wand").bunnyAdd;
  state.bonusBunnies = 0;
  renderHud(state);
  render(state);
}
