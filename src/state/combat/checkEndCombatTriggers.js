"use strict";
export function checkEndCombatTriggers(oldState, combatOutcome) {
  let state = { ...oldState };
  let outcome = combatOutcome;
  let relics = state.relicBelt;
  let bounty = state.currentEnemy.goldReward;

  for (let i = 0; i < relics.length; i++) {
    let relic = relics[i];
    if (relic.trigger == "combatWin" && outcome == "win") {
      console.log(relic);
      //gold medal
      if (relic.bonusGoldPercent) {
        bounty = Math.floor(bounty * (1 + relic.bonusGoldPercent));
        state.currentEnemy.goldReward = bounty;
      }
      //gold ingot
      if ((relic.effect = "interest")) {
        state.gold = state.gold * (1 + relic.interest);
      }
      if (relic.hpHeal) {
        state.hp = Math.min(state.hp + relic.hpHeal, state.maxHp);
      }
    }
  }

  return state;
}
