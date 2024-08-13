"use strict";
// an array with all the relics.
export const relicPool = [
  {
    //integrated
    name: "Magic Wand",
    effect:
      "Gain bonus bunnies at the start of combat equal to your wand power",
    bunnyAdd: 3,
    rarity: "basic",
    type: "relic",
    supertype: "wand",
    trigger: "combatStart",
  },
  {
    //integrated
    name: "Broken Wand",
    bunnyAdd: 0,
    effect:
      "Gain bonus bunnies at the start of combat equal to your wand power",
    rarity: "basic",
    type: "relic",
    supertype: "wand",
    trigger: "combatStart",
  },
  {
    //integrated
    name: "Inkpot",
    effect: "Gain 1 bonus ink each combat",
    rarity: "common",
    inkAdd: 1,
    type: "relic",
    trigger: "combatStart",
  },
  {
    //integrated
    name: "Quill",
    bonusHandsize: 1,
    effect: "Increase your opening hand size by 1",
    rarity: "common",
    type: "relic",
    trigger: "combatStart",
  },
  {
    //integrated
    name: "Extra Page",
    bonusPages: 1,
    effect: "Increase your spellbook size by 1 page",
    rarity: "uncommon",
    type: "relic",
    trigger: "combatStart",
  },
  {
    //integrated
    name: "Hydrangea",
    effect: "Gain 25 max HP",
    bonusMaxHp: 25,
    rarity: "uncommon",
    type: "relic",
    trigger: "pickup",
  },
  {
    //integrated
    name: "Magic Staff",
    effect: "Gain 10 bunnies when you cast your spellbook",
    bunnyAdd: 10,
    rarity: "mythic",
    type: "relic",
    trigger: "cast",
  },

  {
    //integrated
    name: "Gold medal",
    effect: "Gain 50% more gold",
    bonusGoldpercent: 0.5,
    rarity: "common",
    type: "relic",
    trigger: "combatWin",
  },
  {
    //integrated
    name: "Gold ingot",
    effect: "Gain 5% interest on your gold each time you win combat",
    interest: 0.05,
    rarity: "uncommon",
    type: "relic",
    trigger: "combatWin",
  },
  {
    //integrated
    name: "Encyclopedia",
    effect: "Gain 1 bunny each time you draw a card.",
    rarity: "common",
    type: "relic",
    bunniesOnDraw: 1,
    trigger: "draw",
  },
  {
    //integrated
    name: "Golf Club",
    effect: "Gain 1 bonus mulligan each combat",
    rarity: "common",
    type: "relic",
    bonusMulligans: 1,
    trigger: "combatStart",
  },
  //@@@ ~~ UNINTEGRATED ~~ @@@
  // {
  //   //UNINTEGRATED: requires play card mechanic in combat.
  //   name: "Top Hat",
  //   effect: "add +1 bunny to each played card when you play it",
  //   rarity: "rare",
  //   type: "relic",
  //   trigger: "playCard",
  // },
  // {
  //   //UNINTEGRATED: currently no luck nor mf mechanic.
  //   name: "Shako",
  //   bonusLuck: 50,
  //   effect: "+luck",
  //   rarity: "uncommon",
  //   type: "relic",
  //   trigger: "rewardStart",
  // },
];
