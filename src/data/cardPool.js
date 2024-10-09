"use strict";
// an array with all the cards. Ultimately move to a separate objects folder.
// current keywords: addBunnies(bunnyAdd), draw(cardsDrawn), multiplyBunnies(bunnyMult)
export const cardPool = [
  //level -1 (special cards)
  {
    name: "Bunnyfluff",
    imgName: "bunnyfluff",
    level: -1,
    bunnyAdd: 1,
    ink: 1,
    trigger: "instant",
    effect: "Instant - Adds 1 bunny",
    rarity: "special",
    type: "card",
    characterClass: "none",
    color: "basic",
  },
  {
    name: "Pet Brick",
    imgName: "petBrick",
    level: -1,
    effect: "nothing, can't be cast",
    type: "card",
    rarity: "special",
    characterClass: "none",
    color: "basic",
  },
  // level 0 (starter deck)
  {
    name: "Bunnymancy",
    imgName: "bunnymancy",
    level: 0,
    bunnyAdd: 3,
    ink: 1,
    trigger: "cast",
    effect: "Adds 3 bunnies",
    rarity: "common",
    type: "card",
    characterClass: "none",
    color: "basic",
  },
  {
    name: "Ponder",
    imgName: "ponder",
    level: 0,
    ink: 1,
    cardsDrawn: 3,
    trigger: "instant",
    effect: "Instant - Draw 3 cards",
    rarity: "common",
    type: "card",
    characterClass: "none",
    color: "basic",
  },
  {
    name: "Double Bunnies",
    imgName: "bunnydouble",
    level: 0,
    ink: 3,
    bunnyMult: 2,
    effect: "Doubles your bunnies",
    rarity: "common",
    type: "card",
    trigger: "cast",
    characterClass: "none",
    color: "basic",
  },
  {
    name: "Inkswell",
    imgName: "inkswell",
    level: 0,
    ink: 0,
    inkAdd: 1,
    effect: "Instant - Adds 1 ink",
    rarity: "common",
    trigger: "instant",
    type: "card",
    characterClass: "base",
    color: "basic",
  },
  // level 1
  {
    name: "Free Bunnies",
    imgName: "freeBunnies",
    level: 1,
    bunnyAdd: 2,
    ink: 0,
    effect: "Adds 2 bunnies",
    rarity: "common",
    type: "card",
    trigger: "cast",
    characterClass: "none",
    color: "basic",
  },
  {
    name: "Triple Bunnies",
    imgName: "tripleBunnies",
    level: 1,
    ink: 4,
    bunnyMult: 3,
    effect: "Triples your bunnies",
    rarity: "uncommon",
    type: "card",
    trigger: "cast",
    characterClass: "none",
    color: "basic",
  },
  {
    name: "Echoing Splash",
    imgName: "echoingSplash",
    level: 1,
    ink: 2,
    retriggers: 1,
    retriggerScope: "sides",
    effect: "retrigger the spells to the left and right of this one",
    rarity: "uncommon",
    type: "card",
    trigger: "cast",
    characterClass: "none",
    color: "basic",
  },
  {
    name: "Time Warp",
    imgName: "timeWarp",
    level: 1,
    ink: 3,
    retriggers: 1,
    retriggerScope: "all",
    effect: "Trigger the whole spellbook again",
    rarity: "rare",
    type: "card",
    trigger: "cast",
    characterClass: "none",
    color: "basic",
  },
  {
    name: "Time Flip",
    imgName: "timeFlip",
    level: 1,
    ink: 3,
    retriggers: 1,
    retriggerScope: "reverse",
    effect: "Retrigger all spellbook spells cast so far in reverse order",
    rarity: "rare",
    type: "card",
    characterClass: "none",
    trigger: "cast",
    color: "basic",
  },
  {
    name: "Scythe",
    imgName: "scythe",
    level: 1,
    ink: 3,
    reduceEnemyMaxHpPercent: 0.5,
    effect: "Reduce enemy max hp by 50%",
    trigger: "cast",
    characterClass: "none",
    type: "card",
    rarity: "rare",
    color: "basic",
  },
  {
    name: "Sickle",
    imgName: "sickle",
    level: 1,
    ink: 1,
    reduceEnemyMaxHpPercent: 0.1,
    effect: "Reduce enemy max hp by 10%",
    trigger: "instant",
    characterClass: "none",
    type: "card",
    rarity: "common",
    color: "basic",
  },
  // {
  //   name: "Golden Bunny",
  //   imgName: "goldenBunny",
  //   level: 1,
  //   ink: 3,
  //   specialEffect: "midasBunnies",
  //   bunnyAdd: 0,
  //   effect: "Adds bunnies equal to 10% of your gold",
  //   trigger: "cast",
  //   characterClass: "none",
  //   type: "card",
  //   rarity: "mythic",
  //   flavor: "Adds bunnies equal to 10% of your gold",
  //   color: "basic",
  // },
  {
    name: "Conjure Pages",
    imgName: "conjurePages",
    level: 1,
    ink: 1,
    pageAdd: 2,
    effect: "Add two pages to your spellbook",
    trigger: "instant",
    characterClass: "none",
    type: "card",
    rarity: "uncommon",
    color: "basic",
  },
  {
    name: "Shield",
    imgName: "shield",
    level: 1,
    ink: 1,
    shieldAdd: 5,
    effect: "Adds 5 shield",
    trigger: "instant",
    characterClass: "none",
    type: "card",
    rarity: "common",
    color: "basic",
  },
  {
    name: "Fortress",
    imgName: "fortress",
    level: 1,
    ink: 2,
    shieldAdd: 50,
    effect: "Adds 50 shield",
    trigger: "cast",
    characterClass: "none",
    type: "card",
    rarity: "uncommon",
    color: "basic",
  },
  // {
  //   name: "Dispel",
  //   imgName: "dispel",
  //   level: 1,
  //   ink: 1,
  //   purge: 1,
  //   effect: "Purges one random buff from the enemy",
  //   characterClass: "none",
  //   type: "card",
  //   rarity: "common",
  //   trigger: "instant",
  // color: "basic",
  // },
  // {
  //   name: "Mass Dispel",
  //   imgName: "massDispel",
  //   level: 1,
  //   ink: 1,
  //   purge: 3,
  //   effect: "Purges 3 random buffs from the enemy",
  //   characterClass: "none",
  //   type: "card",
  //   rarity: "uncommon",
  //   trigger: "cast",
  //color: "basic",
  // },
];

//green: Cards that permanently upgrade on play / cast.
//red: Cards that heal and drain life
//yellow: Cards that generate gold, upgrade relics, etc.
//magenta: cards with a random element
//cyan: cards that purge
