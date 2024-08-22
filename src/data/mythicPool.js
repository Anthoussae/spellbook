"use strict";

export const mythicPool = [
  {
    name: "Grandmagus's Tome",
    effect: "Increase your spellbook size by 2 pages",
    rarity: "mythic",
    type: "relic",
    trigger: "combatStart",
    bonusPages: 2,
  },
  {
    name: "Phoenix-feather Quill",
    bonusHandsize: 3,
    effect: "Increase your opening hand size by 3",
    rarity: "mythic",
    type: "relic",
    trigger: "combatStart",
  },
  {
    name: "Bottomless Inkpot",
    effect: "Gain 2 bonus ink each combat",
    rarity: "mythic",
    inkAdd: 2,
    type: "relic",
    trigger: "combatStart",
  },
  {
    name: "Gilded Orchid",
    effect: "Gain 50 max HP",
    bonusMaxHp: 50,
    rarity: "mythic",
    type: "relic",
    trigger: "pickup",
  },
  {
    name: "Golden Egg",
    effect: "Gain 50 gold",
    gold: 50,
    rarity: "mythic",
    type: "relic",
    trigger: "pickup",
  },
];
