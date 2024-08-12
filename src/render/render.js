"use strict";

//game state functions
import { renderRest } from "./renderRest";
import { renderBattlefield } from "./renderBattlefield";
import { renderWandUpgrade } from "./renderWandUpgrade";
import { renderShop } from "./renderShop";
import { renderSocketing } from "./renderSocketing";
import { renderPathSelection } from "./renderPathSelection";
import { renderDeckExamine } from "./renderDeckExamine";
import { renderCombatRecap } from "./renderCombatRecap";
import { renderButtons } from "./renderButtons";
import { colorWitch } from "./colorWitch";

export function render(oldState) {
  let state = { ...oldState };
  // colorWitch(state);
  renderButtons(state);
  if (state.currentScreen == "pathSelection") {
    renderPathSelection(state);
  } else if (state.currentScreen == "rest") {
    renderRest(state);
  } else if (state.currentScreen == "combat") {
    renderBattlefield(state);
  } else if (state.currentScreen == "wandUpgrade") {
    renderWandUpgrade(state);
  } else if (state.currentScreen === "deckExamine") {
    renderDeckExamine(state);
  } else if (state.currentScreen === "socketing") {
    renderSocketing(state);
  } else if (state.currentScreen === "shop") {
    renderShop(state);
  } else if (state.currentScreen === "rewardSelection") {
    renderCombatRecap(state);
  } else {
    throw "unknown screen: " + state.currentScreen;
  }
}
