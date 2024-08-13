"use strict";
import { animate } from "../../render/animate";
import { drawXCards } from "./drawXCards";

export function checkDrawTriggers(oldState, card) {
  let state = { ...oldState };
  let relics = state.relicBelt;
  let drawnCard = card;

  //relics triggers
  for (let i = 0; i < relics.length; i++) {
    if (relics[i].trigger === "draw") {
      if (relics[i].bunniesOnDraw) {
        state.bunnies = state.bunnies + relics[i].bunniesOnDraw;
        animate(relics[i]);
      }
    }
  }
  // card triggers

  if (drawnCard.bunniesOnDraw) {
    state.bunnies = state.bunnies + drawnCard.bunniesOnDraw;
  }
  if (drawnCard.drawOnDraw) {
    state = drawXCards(state, drawnCard.drawOnDraw);
  }
  return state;
}
