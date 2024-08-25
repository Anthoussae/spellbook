"use strict";

export const mythicPool = [
  {
    name: "Grandmagus's Tome",
    imgName: "grandmagusTome",
    effect: "Increase your spellbook size by 2 pages",
    rarity: "mythic",
    type: "relic",
    trigger: "combatStart",
    bonusPages: 2,
  },
  // {
  //   name: "Phoenix-feather Quill",
  //   bonusHandsize: 3,
  //   effect: "Increase your opening hand size by 3",
  //   rarity: "mythic",
  //   type: "relic",
  //   trigger: "combatStart",
  // },
  // {
  //   name: "Bottomless Inkpot",
  //   effect: "Gain 2 bonus ink each combat",
  //   rarity: "mythic",
  //   inkAdd: 2,
  //   type: "relic",
  //   trigger: "combatStart",
  // },
  {
    name: "Orchid",
    imgName: "orchid",
    effect: "Gain 50 max HP on pickup",
    bonusMaxHp: 50,
    rarity: "mythic",
    type: "relic",
    trigger: "pickup",
  },
  {
    name: "Golden Egg",
    imgName: "goldenEgg",
    effect: "Gain 50 gold on pickup",
    gold: 50,
    rarity: "mythic",
    type: "relic",
    trigger: "pickup",
  },
  //a relic that upgrades any card you add to your deck
  //a relic that gives your wand +2 bunnies
  //a relic that purges one buff from an enemy at the start of each combat
];
