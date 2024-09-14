"use strict";
import { renderHp, renderGold } from "../render/render";

function modifyStat(oldState, stat, amount) {
  let state = { ...oldState };
  let hp = state.hp;
  let gold = state.gold;
  let maxHp = state.maxHp;
  let previousHp = state.previousHp;
  let previousGold = state.previousGold;
  let previousMaxHp = state.previousMaxHp;

  console.log("hp pre mod", state.hp);
  if (stat === "hp") {
    previousHp = hp;
    hp = hp + amount;
    state.previousHp = previousHp;
    state.hp = hp;
    renderHp(state);
  }
  if (stat === "maxHp") {
    state.previousMaxHp = state.maxHp;
    state.maxHp = state.maxHp + amount;
    renderHp(state);
  }
  if (stat === "gold") {
    state.previousGold = state.gold;
    state.gold = state.gold + amount;
    renderGold(state);
  }
  console.log("hp post mod", state.hp);
  return state;
}
