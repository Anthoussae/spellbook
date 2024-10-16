"use strict";
//gems are items that when selected open up the deck service screen, and allow you to apply a gem to a card.
export const gemPool = [
  {
    name: "Onyx",
    type: "gem",
    rarity: "common",
    effect: "Destroy the socketed card.",
    color: "black",
  },
  {
    name: "Lapis Lazuli",
    type: "gem",
    rarity: "common",
    bunnyAdd: 5,
    effect: "Add 5 bunnies.",
    color: "blue",
  },
  {
    name: "Garnet",
    rarity: "common",
    type: "gem",
    ink: -1,
    effect: "-1 ink cost.",
    color: "red",
  },
  {
    name: "Malachite",
    type: "gem",
    rarity: "common",
    color: "green",
    drawOnDraw: 1,
    effect: "draw an extra card when you draw the socketed card.",
  },
  {
    name: "Amber",
    color: "yellow",
    rarity: "common",
    type: "gem",
    bunnyMult: 1.5,
    effect: "Multiply bunnies by 1.5.",
  },
  {
    name: "Aquamarine",
    color: "cyan",
    type: "gem",
    rarity: "common",
    bunniesOnDraw: 3,
    effect: "Add 3 bunnies when you draw the socketed card.",
  },
  {
    name: "Tourmaline",
    color: "magenta",
    type: "gem",
    rarity: "common",
    bunnyAdd: 3,
    ink: 2,
    bunnyMult: 1.5,
    effect: "+2 ink cost, adds +3 bunnies, and multiplies bunnies by 1.5.",
  },
  {
    name: "Zircon",
    type: "gem",
    color: "white",
    rarity: "common",
    reduceEnemyMaxHpFraction: 0.05,
    effect: "Reduces enemy max hp by 5%.",
  },
  {
    name: "Pumice",
    type: "gem",
    color: "grey",
    rarity: "common",
    shieldAdd: 5,
    effect: "Add 5 shield.",
  },
];

//more gems?
//  gem that adds a retrigger to the socketed card
// gem that adds ink
// gem that adds bunnies on draw
// gem that adds pages
