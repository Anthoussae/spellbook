"use strict";
import { startPathSelection } from "./startPathSelection";
import { insertCard } from "./insertCard";
import { removeCard } from "./removeCard";
import { insertGem } from "./insertGem";
import { render } from "../render/render";

export function socketCardWithGem(oldState) {
  let state = { ...oldState };

  let gem = state.selectedReward;
  let selectedCard = state.selectedCard;
  state = removeCard(state, selectedCard);
  if (gem.name != "Onyx") {
    let socketedCard = insertGem(selectedCard, gem);
    state = insertCard(state, socketedCard);
  }
  state.selectedReward = null;
  document.getElementById("deck").style.visibility = "visible";
  if (state.previousScreen != "shop") {
    startPathSelection(state);
  } else {
    state.currentScreen = "shop";
    render(state);
  }
}
