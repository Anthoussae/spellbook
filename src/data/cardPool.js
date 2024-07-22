"use strict";
// an array with all the cards. Ultimately move to a separate objects folder.
// current keywords: addBunnies(bunnyAdd), draw(cardsDrawn), multiplyBunnies(bunnyMult)
export const cardPool = [
  // level 0 (starter deck)
  {
    name: "Bunnymancy",
    level: 0,
    bunnyAdd: 2,
    ink: 1,
    effect: "addBunnies",
    rarity: "common",
    type: "card",
  },
  {
    name: "Ponder",
    level: 0,
    ink: 1,
    cardsDrawn: 2,
    type: "instant",
    effect: "draw",
    rarity: "common",
    type: "card",
  },
  {
    name: "Bunnyplication",
    level: 0,
    ink: 3,
    bunnyMult: 2,
    effect: "multiplyBunnies",
    rarity: "common",
    type: "card",
  },
  // level 1
  {
    name: "Bounding Bunnies",
    level: 1,
    bunnyAdd: 2,
    ink: 0,
    effect: "addBunnies",
    rarity: "common",
    type: "card",
  },
  {
    name: "Bunny Love",
    level: 1,
    ink: 4,
    bunnyMult: 3,
    effect: "multiplyBunnies",
    rarity: "uncommon",
    type: "card",
  },
];
