"use strict";
//gems are items that when selected open up the deck service screen, and allow you to apply a gem to a card.
export const gemPool = [
  {
    name: "Onyx",
    level: 1,
    type: "gem",
    rarity: "common",
    restrictions: "none",
    effect: "destroy",
  },
  {
    name: "Lapis Lazuli",
    level: 1,
    type: "gem",
    rarity: "common",
    restrictions: "unsocketed",
    bunnies: 2,
    effect: "+bunnies",
  },
];
