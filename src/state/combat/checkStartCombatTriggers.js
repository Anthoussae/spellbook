import { sleep } from "../../util/sleep";

export function checkStartCombatTriggers(oldState) {
  let state = { ...oldState };
  let relics = state.relicBelt;
  //make sure that all of these only apply to combat, and that combat mods are reset at the end of combat.
  for (let i = 0; i < relics.length; i++) {
    let relic = relics[i];
    if (relic.trigger === "turnStart") {
      //wands
      if (relic.bunnyAdd) {
        state.bunnies = state.bunnies + relic.bunnyAdd;
      }
      //inkpot
      if (relic.inkAdd) {
        state.combatInk = state.combatInk + relic.inkAdd;
      }
      //quill
      if (relic.bonusHandsize) {
        state.combatHandSize = state.combatHandSize + relic.bonusHandsize;
      }
      //page
      if (relic.bonusPages) {
        state.combatPages = state.combatPages + relic.bonusPages;
      }
      //golf club
      if (relic.bonusMulligans) {
        state.combatMulligans = state.combatMulligans + relic.bonusMulligans;
      }

      // Wait for 200ms before processing the next relic
    }
  }

  return state;
}
