"use strict";

//charms are static effects that enemies have.
//several cards etc. interact with charms. There are ways of disenchanting charms.
// none of these are implemented
export const charmPool = [
  { name: "Nightshade Charm", effect: "whenever you play a card, lose 1 hp" },
  { name: "Pumpkin Charm", effect: "double HP" },
  { name: "Melon Charm", effect: "+10 Hp" },
  { name: "Watermelon Charm", effect: "+20 Hp" },
  { name: "Foxglove Charm", effect: "You can't mulligan" },
  { name: "Hemlock Charm", effect: "If you would draw, draw -1 cards" },
  {
    name: "Sedge Charm",
    effect:
      "If your cast doesn't fully destroy this, restore 50% hp before damage",
  },
  { name: "Vine Charm", effect: "You can't play instants" },
  {
    name: "Pepper Charm",
    effect: "Double damage",
  },
  {
    name: "Carrot Charm",
    effect: "reduce all played cards addbunnies by 1 and bunnymult by 0.25",
  },
  {
    name: "Lead Charm",
    effect:
      "At the start of combat, shuffle 3 pet bricks into the opponent's deck. If disenchanted, remove them all and draw a card for each one removed from hand. ",
  },
];
