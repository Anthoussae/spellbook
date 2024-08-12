"use strict";
import { renderBattlefield } from "../../render/renderBattlefield";
import { castSpell } from "./castSpell";

export function playCard(oldState, playedCard) {
  let state = { ...oldState };
  let card = playedCard;
  let hand = state.hand;
  let spellbook = state.spellbook;

  //ink cost check
  if (card.ink > state.combatInk) {
    alert("not enough ink!");
    renderBattlefield(state);
    return state;
  } else if (card.ink <= state.combatInk) {
    state.combatInk = state.combatInk - card.ink;
  }
  //if the spellbook doesn't have any "page", alert the player
  if (
    state.spellbook.every((page) => page != "page") &&
    card.trigger == "cast"
  ) {
    alert("no space on the spellbook");
    renderBattlefield(state);
    return state;
  }

  //card type check & page spce caheck
  if (card.trigger == "cast") {
    //if state.spellbook contains any "page", replace the page with the lowest index with the card.
    let page = spellbook.findIndex((page) => page == "page");
    if (page != -1) {
      spellbook[page] = card;
    } else {
      console.log("no space on the spellbook");
    }
    //now remove the chosen card from state.hand.
    let cardIndex = hand.findIndex((card) => card == playedCard);
    hand.splice(cardIndex, 1);
    state.hand = hand;
    state.spellbook = spellbook;
  } else if (card.trigger == "instant") {
    //instant card don't require space on the spellbook, and are instead immediately resolved.
    //  remove the chosen card from state.hand.
    let cardIndex = hand.findIndex((card) => card == playedCard);
    hand.splice(cardIndex, 1);
    state.hand = hand;
    state.spellbook = spellbook;
    //resolve effect
    state = castSpell(state, card);
  }
  renderBattlefield(state);
  return state;
}
