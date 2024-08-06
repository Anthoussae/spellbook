"use strict";
// an array with all the relics.
export const relicPool = [
  {
    name: "Magic Wand",
    level: 0,
    effect: "start each combat with +3 bunnies",
    bunnies: 3,
    rarity: "basic",
    type: "relic",
    supertype: "wand",
    trigger: "combatStart",
  },
  {
    name: "Broken Wand",
    level: 0,
    bunnies: 0,
    effect: "start each combat with +0 bunnies",
    rarity: "basic",
    type: "relic",
    supertype: "wand",
    trigger: "combatStart",
  },
  {
    name: "Inkpot",
    level: 1,
    effect: "+1 ink",
    rarity: "common",
    type: "relic",
    trigger: "combatStart",
  },
  {
    name: "Quill",
    level: 1,
    effect: "+1 handsize",
    rarity: "common",
    type: "relic",
    trigger: "combatStart",
  },
  {
    name: "Page",
    level: 2,
    effect: "+1 page",
    rarity: "uncommon",
    type: "relic",
    trigger: "combatStart",
  },
  {
    name: "Hydrangea",
    level: 2,
    effect: "+25 max HP",
    rarity: "uncommon",
    type: "relic",
    trigger: "pickup",
  },
  {
    name: "Top Hat",
    level: 3,
    effect: "add +1 bunny to each played card",
    rarity: "rare",
    type: "relic",
    trigger: "cardCount",
  },
  {
    name: "Magic Staff",
    level: 4,
    effect: "add +10 bunnies upon cast",
    rarity: "mythic",
    type: "relic",
    trigger: "cast",
  },
  {
    name: "Shako",
    level: 5,
    effect: "+3 luck for rewards",
    rarity: "uncommon",
    type: "relic",
    trigger: "rewardStart",
  },
  {
    name: "Bank Card",
    level: 6,
    effect: "+50% gold from winning combat",
    rarity: "common",
    type: "relic",
    trigger: "combatWin",
  },
];
