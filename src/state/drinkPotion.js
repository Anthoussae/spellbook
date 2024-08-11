"use strict";
export function drinkPotion(state) {
  state = { ...state };
  let potion = state.selectedReward;
  if (potion.effect == "heal") {
    state.hp = Math.min(state.hp + potion.hpHeal, state.maxHp);
  } else if (potion.effect == "bonusBunnies") {
    state.bonusBunnies = state.bonusBunnies + potion.bunnies;
  } else if (potion.effect == "gainGold") {
    state.gold = state.gold + potion.goldReward;
  } else if (potion.effect == "bloodPact") {
    state.gold = state.gold + potion.goldReward;
    state.hp = state.hp - potion.hpHeal;
  }
  return state;
}
