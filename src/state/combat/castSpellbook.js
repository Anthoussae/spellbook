"use strict";
import { checkCastTriggers } from "./checkCastTriggers";
import { endCombat } from "./endCombat";
import { castSpell } from "./castSpell";
import { sleep } from "../../util/sleep";
import { render } from "../../render/render";

export function castSpellbook(state) {
  // state = checkCastTriggers(state);
  let spellbook = state.spellbook;

  // for (let i = 0; i < spellbook.length; i++) {
  //   let card = spellbook[i];
  //   state = castSpell(state, card);

  //   // Pause for 200ms between each spell cast
  // }

  // //apply damage.
  // state.bunnies = Math.floor(state.bunnies);
  // state.currentEnemy.hp = state.currentEnemy.hp - state.bunnies;
  // renderBattleHud(state);
  // if (state.currentEnemy.hp > 0) {
  //   state.hp = state.hp - state.currentEnemy.hp;
  // }
  // state.lastEnemyHp = state.currentEnemy.hp;

  // endCombat(state);
  console.log("castSpellbook", state);
  render(state);
  return state;
}
