"use strict";
export function applyBuffEffects(oldState, timing) {
  let state = { ...oldState };
  const enemy = state.currentEnemy;
  const buffs = enemy.buffs;
  const level = state.level;
  if (timing === "start") {
    if (buffs.length > 0) {
      buffs.forEach((buff) => {
        if (buff.name === "Heart") {
          buff.storedValue = Math.floor(buff.bonusHpMult * enemy.hp) || 1;
          enemy.hp = enemy.hp + buff.storedValue;
        }
        if (buff.name === "Shield") {
          buff.storedValue = buff.bonusHpPerLevel * level;
          enemy.hp = enemy.hp + buff.storedValue;
        }
        if (buff.name === "Poison") {
          state.combatHandSize = state.combatHandSize + buff.handSizeAdd;
        }
        if (buff.name === "Burden") {
          state.combatInk = state.combatInk + buff.inkAdd;
        }
        if (buff.name === "Curse") {
          state.combatPages = state.combatPages + buff.pageAdd;
        }
        if (buff.name === "Weaken") {
          buff.storedValue = buff.bunnyAddPerLevel * level;
          state.bunnies = state.bunnies + buff.storedValue;
        }
        if (buff.name === "Empowered") {
          buff.storedValue = buff.bonusDamagePerLevel * level;
          enemy.attack = enemy.attack + buff.storedValue;
        }
      });
    }

    return state;
  } else if (timing === "turnStart") {
    buffs.forEach((buff) => {
      if (buff.name === "Poison") {
        state.combatHandSize = state.combatHandSize + buff.handSizeAdd;
      }
      if (buff.name === "Burden") {
        state.combatInk = state.combatInk + buff.inkAdd;
      }
      if (buff.name === "Seer") {
        state.combatPages = state.combatPages + buff.pageAdd;
      }
      if (buff.name === "Weaken") {
        buff.storedValue = buff.bunnyAddPerLevel * level;
        state.bunnies = state.bunnies - buff.storedValue;
      }
    });
    return state;
  }
}
