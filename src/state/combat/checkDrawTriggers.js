"use strict";
import { animate } from "../../render/animate";

export function checkDrawTriggers(oldState, card) {
  let state = { ...oldState };
  let relics = state.relicBelt;
  let drawnCard = card;

  //relics triggers
  for (let i = 0; i < relics.length; i++) {
    if (relics[i].trigger === "draw") {
      if (relics[i].effect === "bunniesOnDraw") {
        state.bunnies = state.bunnies + relics[i].bunniesOnDraw;
        animate(relics[i]);
      }
    }
  }
  // card triggers
  if (drawnCard.trigger === "draw") {
    if (drawnCard.bunniesOnDraw) {
      state.bunnies = state.bunnies + drawnCard.bunniesOnDraw;
    }
  }
  return state;
}
