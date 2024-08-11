"use strict";
import { drawXCards } from "./drawXCards";
import { renderBattlefield } from "../../render/renderBattlefield";

export function castSpell(oldState, card) {
  let state = { ...oldState };
  if (card == "page" || typeof card != "object") {
    console.log("not a valid spell!");
    return state;
  }
  if (card.effect == "draw") {
    state = drawXCards(state, card.cardsDrawn);
  }
  if (card.effect == "addBunnies") {
    state.bunnies += card.bunnyAdd;
  }
  if (card.effect == "addInk") {
    state.combatInk += card.inkAdd;
  }
  if (card.effect == "reduceEnemyMaxHpPercent") {
    state.currentEnemy.maxHp =
      state.currentEnemy.maxHp * (1 - card.reduceEnemyMaxHpPercent);
  }
  if (card.effect == "addPages") {
    for (let i = 0; i < card.pageAdd; i++) {
      state.spellbook.push("page");
    }
  }
  if (card.effect == "multiplyBunnies") {
    state.bunnies = state.bunnies * card.bunnyMult;
  }
  if (card.effect == "midasBunnies") {
    state.bunnies = state.bunnies + Math.floor(state.gold / 10);
  }
  if (card.effect == "retrigger" && card.retriggers > 0) {
    card.retriggers = card.retriggers - 1;
    if (card.scope == "self") {
      state = castSpell(state, card);
    } else if (card.scope == "sides") {
      let cardIndex = state.spellbook.indexOf(card);
      if (cardIndex > 0) {
        let leftCard = state.spellbook[cardIndex - 1];
        state = castSpell(state, leftCard);
      }
      if (cardIndex < state.spellbook.length - 1) {
        let rightCard = state.spellbook[cardIndex + 1];
        state = castSpell(state, rightCard);
      }
    } else if (card.scope == "all") {
      for (let i = 0; i < state.spellbook.length; i++) {
        state = castSpell(state, state.spellbook[i]);
      }
    } else if (card.scope == "reverse") {
      let cardIndex = state.spellbook.indexOf(card);
      // Ensure cardIndex is valid (not -1)
      if (cardIndex >= 0) {
        for (let i = cardIndex - 1; i >= 0; i--) {
          state = castSpell(state, state.spellbook[i]);
        }
      }
    }
  }
  renderBattlefield(state);
  return state;
}
