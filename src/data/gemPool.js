"use strict";
//gems are items that when selected open up the deck service screen, and allow you to apply a gem to a card.
export const gemPool = [
  {
    name: "Onyx",
    type: "gem",
    rarity: "common",
    effect: "destroy the socketed card",
    color: "black",
    shape: "circle",
  },
  {
    name: "Lapis Lazuli",
    type: "gem",
    rarity: "common",
    bunnyAdd: 5,
    effect: "addBunnies",
    color: "blue",
    shape: "triangle",
  },
  {
    name: "Garnet",
    rarity: "common",
    type: "gem",
    ink: -1,
    effect: "-ink",
    color: "red",
    shape: "hexagon",
  },
  {
    name: "Malachite",
    type: "gem",
    rarity: "common",
    color: "green",
    cardsDrawn: 1,
    effect: "draw",
    shape: "square",
  },
  {
    name: "Amber",
    color: "yellow",
    rarity: "common",
    type: "gem",
    bunnyMult: 150,
    effect: "multiplyBunnies",
    shape: "star",
  },
  {
    name: "Aquamarine",
    color: "cyan",
    type: "gem",
    rarity: "common",
    bunniesOnDraw: 3,
    effect: "addBunniesOnDraw",
    shape: "crystal",
  },
  {
    name: "Tourmaline",
    color: "magenta",
    type: "gem",
    rarity: "common",
    bunnyAdd: 5,
    ink: 2,
    bunnyMult: 150,
    effect: "several",
    shape: "broken",
  },
  {
    name: "Zircon",
    type: "gem",
    color: "white",
    rarity: "common",
    reduceEnemyMaxHpPercent: 5,
    effect: "reduceEnemyMaxHpPercent",
    shape: "octagon",
  },
  {},
];

//  gem that adds a retrigger to the socketed card
// gem that adds ink
// gem that adds bunnies on draw
// gem that adds pages
