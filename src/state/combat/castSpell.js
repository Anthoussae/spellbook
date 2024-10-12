"use strict";
import { drawXCards } from "./drawXCards";
import { purgeBuff } from "./purgeBuff";
// import { renderBattlefield } from "../../render/renderBattlefield";

export function castSpell(oldState, card) {
  let state = { ...oldState };
  if (card == "page") {
    console.log("~ empty page ~");
  } else if (typeof card != "object") {
    console.log("not a valid spell!");
    return state;
  }
  if (card.purge) {
    for (let i = 0; i < card.purge; i++) {
      state = purgeBuff(state);
    }
  }
  if (card.cardsDrawn) {
    state = drawXCards(state, card.cardsDrawn);
  }
  if (card.bunnyAdd) {
    state.bunnies += card.bunnyAdd;
  }
  if (card.inkAdd) {
    state.combatInk += card.inkAdd;
  }
  if (card.reduceEnemyMaxHpFraction) {
    state.currentEnemy.hp = Math.floor(
      state.currentEnemy.hp * (1 - card.reduceEnemyMaxHpFraction)
    );
  }
  if (card.pageAdd) {
    for (let i = 0; i < card.pageAdd; i++) {
      state.spellbook.push("page");
    }
  }
  if (card.shieldAdd) {
    state.shield += card.shieldAdd;
  }
  if (card.bunnyMult) {
    state.bunnies = state.bunnies * card.bunnyMult;
  }
  if (card.specialEffect == "midasBunnies") {
    state.bunnies = state.bunnies + Math.floor(state.gold / 10);
  }
  if (card.retriggers && card.retriggers > 0) {
    card.retriggers = card.retriggers - 1;
    if (card.retriggerScope == "self") {
      state = castSpell(state, card);
    } else if (card.retriggerScope == "sides") {
      let cardIndex = state.spellbook.indexOf(card);
      if (cardIndex > 0) {
        let leftCard = state.spellbook[cardIndex - 1];
        state = castSpell(state, leftCard);
      }
      if (cardIndex < state.spellbook.length - 1) {
        let rightCard = state.spellbook[cardIndex + 1];
        state = castSpell(state, rightCard);
      }
    } else if (card.retriggerScope == "all") {
      for (let i = 0; i < state.spellbook.length; i++) {
        state = castSpell(state, state.spellbook[i]);
      }
    } else if (card.retriggerScope == "reverse") {
      let cardIndex = state.spellbook.indexOf(card);
      // Ensure cardIndex is valid (not -1)
      if (cardIndex >= 0) {
        for (let i = cardIndex - 1; i >= 0; i--) {
          state = castSpell(state, state.spellbook[i]);
        }
      }
    }
  }
  // renderBattlefield(state);
  return state;
}
