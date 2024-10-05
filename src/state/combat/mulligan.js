"use strict";
import { drawXCards } from "./drawXCards";
import { render } from "../../render/render";
// import { renderBattlefield } from "../../render/renderBattlefield";
import { renderButtons } from "../../render/renderButtons";

export function mulligan(oldState) {
  // Make a shallow copy of the state object and deep copy of arrays
  let state = { ...oldState };
  //count cards in hand
  state.combatMulligans = state.combatMulligans - 1;
  let handSize = state.hand.length;
  console.log("Handsize: ", handSize);
  // Move all cards from hand to graveyard
  state.hand.forEach((card) => state.graveyard.push(card));
  // Clear the hand
  state.hand = [];

  // Draw new cards (at least one less than original hand size)
  drawXCards(state, handSize - 1);

  // Update the state object
  console.log(state.hand);
  // renderBattlefield(state);
  return state;
}
