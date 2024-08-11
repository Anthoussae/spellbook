import { animate } from "../../render/animate";

export function checkStartCombatTriggers(oldState) {
  let state = { ...oldState };
  let relics = state.relicBelt;
  //make sure that all of these only apply to combat, and that combat mods are reset at the end of combat.
  for (let i = 0; i < relics.length; i++) {
    let relic = relics[i];
    if (relic.trigger === "combatStart") {
      //wands
      if (relic.effect === "bunniesOnStart") {
        state.bunnies = state.bunnies + relic.bunnyAdd;
        animate(relic);
      }
      //inkpot
      if (relic.effect === "inkOnStart") {
        state.combatInk = state.combatInk + relic.inkAdd;
        animate(relic);
      }
      //quill
      if (relic.effect === "+openingHandsize") {
        state.combatHandSize = state.combatHandSize + relic.bonusHandsize;
        animate(relic);
      }
      //page
      if (relic.effect === "+pages") {
        state.combatPages = state.combatPages + relic.bonusPages;
        animate(relic);
      }
      //golf club
      if (relic.effect === "+mulligans") {
        state.combatMulligans = state.combatMulligans + relic.bonusMulligans;
        animate(relic);
      }
    }
  }
  return state;
}
