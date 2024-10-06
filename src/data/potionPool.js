"use strict";
// potions are one use items that instantly apply a modification.
export const potionPool = [
  {
    name: "Lesser Healing Potion",
    level: 1,
    hpHeal: 10,
    type: "potion",
    rarity: "common",
    effect: "Instantly heals 10 hp",
  },
  {
    name: "Healing Potion",
    level: 2,
    type: "potion",
    hpHeal: 20,
    rarity: "uncommon",
    effect: "Instantly heals 20 hp",
  },
  {
    name: "Greater Healing Potion",
    level: 3,
    type: "potion",
    hpHeal: 20,
    rarity: "rare",
    effect: "Instantly heals 30 hp",
  },
  {
    name: "Lesser Bunnyjar",
    level: 1,
    type: "potion",
    bonusBunnies: 10,
    rarity: "common",
    effect: "Gain 10 bonus bunnies next combat",
  },
  {
    name: "Bunnyjar",
    level: 2,
    type: "potion",
    bonusBunnies: 20,
    rarity: "uncommon",
    effect: "Gain 20 bonus bunnies next combat",
  },
  {
    name: "Greater Bunnyjar",
    level: 3,
    type: "potion",
    bonusBunnies: 30,
    rarity: "rare",
    effect: "Gain 30 bonus bunnies next combat",
  },
  {
    name: "Lesser Wand Oil",
    level: 1,
    type: "potion",
    wandUpgrade: 1,
    rarity: "common",
    effect: "Permanently upgrade your wand by 1",
  },
  {
    name: "Wand Oil",
    level: 2,
    type: "potion",
    wandUpgrade: 2,
    rarity: "uncommon",
    effect: "Permanently upgrade your wand by 2",
  },
  {
    name: "Greater Wand Oil",
    level: 3,
    type: "potion",
    wandUpgrade: 3,
    rarity: "rare",
    effect: "Permanently upgrade your wand by 3",
  },
  //keys behave as potions. Janky but reasonable.
  {
    name: "Key",
    level: 1,
    type: "potion",
    rarity: "common",
    effect: "Gain 1 key",
    addKeys: 1,
  },
  {
    name: "Scholar's Draught",
    level: 1,
    type: "potion",
    rarity: "common",
    effect: "Upgrade a random card in your deck",
    randomUpgrade: 1,
  },
  //potions that upgrade 1, 2, or 3 cards in your deck
  //potions that give you 1, 2, or 3 bonus ink next fight
  //perfumes that give +5 / +10/ +15 max hpx
];
