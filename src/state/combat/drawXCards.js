"use strict";

import { findObjectInArray } from "../../util/findObjectInArray";
import { checkDrawTriggers } from "./checkDrawTriggers";
import { renderCardDraw } from "../../render/renderCardDraw";

export function drawXCards(oldState, x) {
  let state = { ...oldState };
  for (let i = 0; i < x; i++) {
    state = drawCard(state);
  }
  return state;
}

export function drawCard(oldState) {
  let state = { ...oldState };

  if (state.combatDeck.length > 0) {
    //drawn card will be a random card from the combat deck. That card will be removed from combat deck and added to hand.
    let drawnCard =
      state.combatDeck[Math.floor(Math.random() * state.combatDeck.length)];
    state.hand.push(drawnCard);
    state.combatDeck.splice(state.combatDeck.indexOf(drawnCard), 1);
    state = checkDrawTriggers(state, drawnCard);
    renderCardDraw(drawnCard);
  } else if (state.combatDeck.length < 1) {
    state.hand.push(findObjectInArray(state.cardPool, "name", "Bunnyfluff"));
  }

  return state;
}
