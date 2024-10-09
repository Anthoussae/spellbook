"use strict";

export const mythicPool = [
  {
    name: "Grandmagus's Tome",
    imgName: "grandmagusTome",
    effect: "Increase your spellbook size by 2 pages, but -1 hand size.",
    rarity: "mythic",
    type: "relic",
    trigger: "turnStart",
    bonusPages: 2,
    bonusHandsize: -1,
    buffDisplay: false,
  },
  {
    name: "Phoenix-feather Quill",
    imgName: "phoenixFeatherQuill",
    bonusHandsize: 2,
    inkAdd: -1,
    effect: "Increase your hand size by 2, but -1 ink.",
    rarity: "mythic",
    type: "relic",
    trigger: "turnStart",
    buffDisplay: false,
  },
  {
    name: "Eternal Inkstone",
    imgName: "eternalInkstone",
    effect: "Gain 2 bonus ink, but -1 spellbook page.",
    rarity: "mythic",
    inkAdd: 2,
    bonusPages: -1,
    type: "relic",
    trigger: "turnStart",
    buffDisplay: false,
  },
  {
    name: "Blessed Orchid",
    imgName: "orchid",
    effect: "Heal 20 HP at the end of each combat.",
    hpHeal: 20,
    rarity: "mythic",
    type: "relic",
    trigger: "combatWin",
    buffDisplay: false,
  },
  {
    name: "Golden Egg",
    imgName: "goldenEgg",
    effect: "Gain 5% interest on your gold each time you win combat.",
    interest: 0.05,
    rarity: "mythic",
    type: "relic",
    trigger: "combatWin",
    buffDisplay: false,
  },
  {
    name: "Gaoler's Keychain",
    imgName: "gaolersKeychain",
    effect: "Gain 7 keys on pickup.",
    addKeys: 7,
    rarity: "mythic",
    type: "relic",
    trigger: "pickup",
    buffDisplay: false,
  },
  {
    name: "Tarot Deck",
    imgName: "tarotDeck",
    effect: "Whenever you add a card to your deck, upgrade it.",
    upgradeCard: 1,
    rarity: "mythic",
    type: "relic",
    trigger: "cardAdd",
    buffDisplay: false,
  },
  {
    name: "Pixie Dust",
    imgName: "pixieDust",
    effect: "Upgrade five random cards on pickup.",
    randomUpgrade: 5,
    rarity: "mythic",
    type: "relic",
    trigger: "pickup",
    buffDisplay: false,
  },
  {
    name: "Nazar",
    imgName: "nazar",
    effect: "Gain 10 shield at the start of each turn.",
    shieldAdd: 10,
    rarity: "mythic",
    type: "relic",
    trigger: "turnStart",
    buffDisplay: false,
  },
  //a relic that upgrades any card you add to your deck.
  //a relic that grants +25% bunnies on cast.
  //a relic that purges one buff from an enemy at the start of each combat.

  //4 more relics
  //a relic that heals 10 HP each combat.
  //a relic that shuffles 7 random cards into your deck.
  //a relic that sockets 3 random cards in your deck with gems.
  //a relic that randomly upgrades one of your cards 4 times.

  //relics with drawbacks, like StS
];
