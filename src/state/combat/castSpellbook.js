"use strict";
import { checkCastTriggers } from "./checkCastTriggers";
import { endCombat } from "./endCombat";
import { castSpell } from "./castSpell";
import { sleep } from "../../util/sleep";

export async function castSpellbook(state) {
  state = checkCastTriggers(state);
  let spellbook = state.spellbook;

  for (let i = 0; i < spellbook.length; i++) {
    let card = spellbook[i];
    state = castSpell(state, card);

    // Pause for 200ms between each spell cast
    await sleep(200);
  }

  await sleep(200);
  //apply damage.
  state.bunnies = Math.floor(state.bunnies);
  state.currentEnemy.hp = state.currentEnemy.hp - state.bunnies;
  if (state.currentEnemy.hp > 0) {
    state.hp = state.hp - state.currentEnemy.hp;
  }
  state.lastEnemyHp = state.currentEnemy.hp;

  await sleep(200);
  endCombat(state);
  return state;
}
