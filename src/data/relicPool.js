"use strict";
// an array with all the relics.
export const relicPool = [
  {
    //integrated
    name: "Magic Wand",
    imgName: "magicWand",
    effect: "When you cast, gain ${bunnyAdd} bonus bunnies.",
    bunnyAdd: 1,
    rarity: "basic",
    type: "relic",
    supertype: "wand",
    trigger: "combatStart",
  },
  {
    //integrated
    name: "Broken Wand",
    imgName: "brokenWand",
    bunnyAdd: 0,
    effect: "When you cast, gain ${bunnyAdd} bonus bunnies.",
    rarity: "basic",
    type: "relic",
    supertype: "wand",
    trigger: "combatStart",
  },
  //need pics
  {
    //integrated
    name: "Inkpot",
    effect: "Gain 1 bonus ink each combat.",
    rarity: "common",
    imgName: "inkpot",
    inkAdd: 1,
    type: "relic",
    trigger: "combatStart",
  },
  {
    //integrated
    name: "Brush",
    bonusHandsize: 1,
    imgName: "brush",
    effect: "Increase your opening hand size by 1.",
    rarity: "common",
    type: "relic",
    trigger: "combatStart",
  },
  {
    //integrated
    name: "Scroll",
    imgName: "scroll",
    bonusPages: 1,
    effect: "Increase your spellbook size by 1 page.",
    rarity: "uncommon",
    type: "relic",
    trigger: "combatStart",
  },
  {
    //integrated
    name: "Hydrangea",
    imgName: "hydrangea",
    effect: "Gain 25 max HP upon pickup.",
    bonusMaxHp: 25,
    rarity: "uncommon",
    type: "relic",
    trigger: "pickup",
  },
  {
    //integrated
    name: "Magic Staff",
    imgName: "magicStaff",
    effect: "Gain 5 bunnies when you cast your spellbook.",
    bunnyAdd: 5,
    rarity: "mythic",
    type: "relic",
    trigger: "cast",
  },
  //bugged
  // {
  //   //integrated
  //   name: "Gold medal",
  //   effect: "Gain 50% more gold",
  //   bonusGoldPercent: 0.5,
  //   rarity: "common",
  //   type: "relic",
  //   trigger: "combatWin",
  // },
  {
    //integrated
    name: "Gold ingot",
    imgName: "goldIngot",
    effect: "Gain 50 gold on pickup.",
    gold: 50,
    rarity: "uncommon",
    type: "relic",
    trigger: "pickup",
  },
  {
    //integrated
    name: "Encyclopaedia",
    imgName: "encyclopaedia",
    effect: "Gain 1 bunny each time you draw a card.",
    rarity: "common",
    type: "relic",
    bunniesOnDraw: 1,
    trigger: "draw",
  },
  // {
  //   //integrated
  //   name: "Golf Ball",
  //   imgName: "golfBall",
  //   effect: "Gain 1 bonus mulligan each combat",
  //   rarity: "common",
  //   type: "relic",
  //   bonusMulligans: 1,
  //   trigger: "combatStart",
  // },
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

  //bunnyfluff
  //a relic that makes bunnyfluff cost 0 mana
  //a relic that makes bunnyfluff add 3 bunnies

  //gold
  //a relic that gives you 10 gold whenever you obtain a gem

  //upgrades
  //a relic that randomly upgrades a card whenever you win combat
  //a relic that upgrades any card you socket with a gem

  //healing and max HP
  //a relic that gives you +5 max hp whenever you win combat without taking damage
  //a relic that heals you for 5 hp at the start of each combat
  //a relic that gives you +2 max hp whenever you upgrade a card
  //a relic that fully heals you whenever you use an Onyx gem

  //instant synergy
  //a relic that purges a buff from an enemy whenever you cast an instant
  //a relic that reduces the cost of the first instant you draw each combat to 0.

  //ink
  //a relic that stores your excess ink for next fight
  //a relic that gievs you 1 bonus ink every 10th card you draw
  //a relic that gives you 1 bonus ink whenever you mulligan

  //drawbacks
  //a relic that makes you lose 50% max HP on pickup, but grants +50% bunnies on cast
  //a relic that decreases your ink by 1, but sockets 3 random cards with gems on pickup
];
