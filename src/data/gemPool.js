"use strict";
//gems are items that when selected open up the deck service screen, and allow you to apply a gem to a card.
export const gemPool = [
  {
    name: "Onyx",
    type: "gem",
    rarity: "common",
    effect: "Destroy the socketed card",
    color: "black",
    shape: "circle",
  },
  {
    name: "Lapis Lazuli",
    type: "gem",
    rarity: "common",
    bunnyAdd: 5,
    effect: "Add 5 bunnies",
    color: "blue",
    shape: "triangle",
  },
  {
    name: "Garnet",
    rarity: "common",
    type: "gem",
    ink: -1,
    effect: "Ink cost reduction -1",
    color: "red",
    shape: "hexagon",
  },
  {
    name: "Malachite",
    type: "gem",
    rarity: "common",
    color: "green",
    drawOnDraw: 1,
    effect: "draw a card when you draw it",
    shape: "square",
  },
  {
    name: "Amber",
    color: "yellow",
    rarity: "common",
    type: "gem",
    bunnyMult: 1.5,
    effect: "Multiply bunnies by 1.5",
    shape: "star",
  },
  {
    name: "Aquamarine",
    color: "cyan",
    type: "gem",
    rarity: "common",
    bunniesOnDraw: 3,
    effect: "Adds 3 bunnies when you draw it",
    shape: "crystal",
  },
  {
    name: "Tourmaline",
    color: "magenta",
    type: "gem",
    rarity: "common",
    bunnyAdd: 3,
    ink: 2,
    bunnyMult: 1.5,
    effect: "Costs 2 more ink, adds 3 bunnies, and multiplies bunnies by 1.5",
    shape: "broken",
  },
  {
    name: "Zircon",
    type: "gem",
    color: "white",
    rarity: "common",
    reduceEnemyMaxHpPercent: 0.05,
    effect: "Reduces enemy max hp by 5%",
    shape: "octagon",
  },
];

//  gem that adds a retrigger to the socketed card
// gem that adds ink
// gem that adds bunnies on draw
// gem that adds pages
