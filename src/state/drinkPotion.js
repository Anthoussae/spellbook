import { findObjectInArray } from "../util/findObjectInArray";
import { transformRelic } from "./transformRelic";

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
