import { findObjectInArray } from "../util/findObjectInArray";
import { transformRelic } from "./transformRelic";
import { randomlyUpgradeXCards } from "./upgradeXCards";

("use strict");
export function drinkPotion(oldState) {
  let state = { ...oldState };
  let potion = state.selectedReward;
  if (potion.hpHeal) {
    state.hp = Math.min(state.hp + potion.hpHeal, state.maxHp);
  } else if (potion.bonusBunnies) {
    state.bonusBunnies = state.bonusBunnies + potion.bonusBunnies;
  } else if (potion.wandUpgrade) {
    state = upgradeWand(state, potion.wandUpgrade);
  } else if (potion.addKeys) {
    state.keys = state.keys + potion.addKeys;
  } else if (potion.randomUpgrade) {
    state = randomlyUpgradeXCards(state, 1);
  }
  return state;
}

function upgradeWand(oldState, potionWandUpgrade) {
  let state = { ...oldState };
  let oldWand = findObjectInArray(state.relicBelt, "supertype", "wand");
  if (typeof oldWand !== "object") {
    console.log("No wand to upgrade");
    return state;
  }
  let newWand = {
    ...oldWand,
    bunnyAdd: oldWand.bunnyAdd + potionWandUpgrade,
  };
  transformRelic(state, oldWand, newWand);
  return state;
}
