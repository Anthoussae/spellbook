"use strict";
// potions are one use items that instantly apply a modification.
export const potionPool = [
  {
    name: "Firefly Potion",
    level: 1,
    goldReward: 10,
    type: "potion",
    rarity: "common",
  },
  {
    name: "Lesser Healing Potion",
    level: 1,
    hpHeal: 10,
    type: "potion",
    rarity: "common",
  },
  {
    name: "Leech Potion",
    level: 1,
    type: "potion",
    goldReward: 20,
    hpHeal: -10,
    rarity: "rare",
  },
  {
    name: "Greater Healing Potion",
    level: 1,
    type: "instant",
    goldReward: -10,
    hpHeal: 20,
    rarity: "uncommon",
  },
  {},
];
