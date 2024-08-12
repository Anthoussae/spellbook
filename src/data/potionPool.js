"use strict";
// potions are one use items that instantly apply a modification.
export const potionPool = [
  {
    name: "Firefly Potion",
    level: 1,
    goldReward: 10,
    type: "potion",
    rarity: "common",
    effect: "gainGold",
  },
  {
    name: "Lesser Healing Potion",
    level: 1,
    hpHeal: 10,
    type: "potion",
    rarity: "common",
    effect: "heal",
  },
  {
    name: "Leech Potion",
    level: 1,
    type: "potion",
    goldReward: 20,
    hpHeal: -10,
    rarity: "common",
    effect: "bloodPact",
  },
  {
    name: "Greater Healing Potion",
    level: 2,
    type: "potion",
    hpHeal: 20,
    rarity: "uncommon",
    effect: "heal",
  },
  {
    name: "Lesser Bunnyjar",
    level: 1,
    type: "potion",
    bunnies: 10,
    rarity: "common",
    effect: "bonusBunnies",
  },
  {
    name: "Greater Bunnyjar",
    level: 2,
    type: "potion",
    bunnies: 20,
    rarity: "uncommon",
    effect: "bonusBunnies",
  },
];
