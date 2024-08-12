"use strict";
// an array with all the relics.
export const relicPool = [
  {
    //integrated
    name: "Magic Wand",
    effect: "bunniesOnStart",
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
    effect: "bunniesOnStart",
    rarity: "basic",
    type: "relic",
    supertype: "wand",
    trigger: "combatStart",
  },
  {
    //integrated
    name: "Inkpot",
    effect: "inkOnStart",
    rarity: "common",
    inkAdd: 1,
    type: "relic",
    trigger: "combatStart",
  },
  {
    //integrated
    name: "Quill",
    bonusHandsize: 1,
    effect: "+openingHandsize",
    rarity: "common",
    type: "relic",
    trigger: "combatStart",
  },
  {
    //integrated
    name: "Extra Page",
    bonusPages: 1,
    effect: "+1 page",
    rarity: "uncommon",
    type: "relic",
    trigger: "combatStart",
  },
  {
    //integrated
    name: "Hydrangea",
    effect: "+maxHp",
    bonusMaxHp: 25,
    rarity: "uncommon",
    type: "relic",
    trigger: "pickup",
  },
  {
    //integrated
    name: "Magic Staff",
    effect: "bunnyAdd",
    bunnyAdd: 10,
    rarity: "mythic",
    type: "relic",
    trigger: "cast",
  },

  {
    //integrated
    name: "Gold medal",
    effect: "bonusGoldPercent",
    bonusGoldpercent: 0.5,
    rarity: "common",
    type: "relic",
    trigger: "combatWin",
  },
  {
    //integrated
    name: "Gold ingot",
    effect: "interest",
    interest: 0.05,
    rarity: "uncommon",
    type: "relic",
    trigger: "combatWin",
  },
  {
    //integrated
    name: "Encyclopedia",
    effect: "bunniesOnDraw",
    rarity: "common",
    type: "relic",
    bunniesOnDraw: 1,
    trigger: "draw",
  },
  {
    //integrated
    name: "Golf Club",
    effect: "+mulligans",
    rarity: "common",
    type: "relic",
    bonusMulligans: 1,
    trigger: "combatStart",
  },
  //@@@ ~~ UNINTEGRATED ~~ @@@
  {
    //UNINTEGRATED: requires play card mechanic in combat.
    name: "Top Hat",
    effect: "add +1 bunny to each played card when you play it",
    rarity: "rare",
    type: "relic",
    trigger: "playCard",
  },
  {
    //UNINTEGRATED: currently no luck nor mf mechanic.
    name: "Shako",
    bonusLuck: 50,
    effect: "+luck",
    rarity: "uncommon",
    type: "relic",
    trigger: "rewardStart",
  },
];
