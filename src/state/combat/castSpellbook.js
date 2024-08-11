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

  // Update state.hp and state.currentEnemy.hp
  endCombat(state);
  return state;
}
