"use strict";

//currently Blue simply adds even more luck. This is a placeholder for a more complex system.
// luck is curently unintegrated and has no effect.
export function applyColorTraits(oldState) {
  let state = { ...oldState };
  let bonusLuck = Math.floor(
    (255 - state.color.R + (255 - state.color.G) + (255 - state.color.B)) / 10
  );
  bonusLuck = bonusLuck + Math.floor(state.color.B / 10);
  let bonusGold = Math.floor(state.color.G / 10);
  let bonusHp = Math.floor(state.color.R / 10);
  // let bonusBuns = Math.floor(state.color.B / 10);
  state.maxHp = state.maxHp + bonusHp;
  state.hp = state.hp + bonusHp;
  state.gold = state.gold + bonusGold;
  // state.bonusBunnies = state.bonusBunnies + bonusBuns;
  state.luck = state.luck + bonusLuck;
  return state;
}
