"use strict";

//to do & bugfixes

//fix the double-render bug on mythicSelection.
//fix the triple-render bug on deckButton.
//add animations for non-selected relics.
//render bag examine - display relics, fix 'exit' button.
//render deck examine - display cards, fix 'exit' button.
//(state)implement relic check trigger function when a relic is picked from mythicSelection.
//implement remainder of the game logic in provisional skeleton mode.

// Statically import all images
export const relicImages = {
  //mythics
  orchid: require("../data/imgs/mythicRelics/orchid.png"),
  grandmagusTome: require("../data/imgs/mythicRelics/grandmagusTome.png"),
  goldenEgg: require("../data/imgs/mythicRelics/goldenEgg.png"),
  phoenixFeatherQuill: require("../data/imgs/mythicRelics/phoenixFeatherQuill.png"),
  eternalInkstone: require("../data/imgs/mythicRelics/eternalInkstone.png"),
  gaolersKeychain: require("../data/imgs/mythicRelics/gaolersKeychain.png"),
  tarotDeck: require("../data/imgs/mythicRelics/tarotDeck.png"),
  pixieDust: require("../data/imgs/mythicRelics/pixieDust.png"),
  //relics
  magicWand: require("../data/imgs/relics/magicWand.png"),
  brokenWand: require("../data/imgs/relics/brokenWand.png"),
  inkpot: require("../data/imgs/relics/inkpot.png"),
  brush: require("../data/imgs/relics/brush.png"),
  scroll: require("../data/imgs/relics/scroll.png"),
  hydrangea: require("../data/imgs/relics/hydrangea.png"),
  magicStaff: require("../data/imgs/relics/magicStaff.png"),
  goldIngot: require("../data/imgs/relics/goldIngot.png"),
  encyclopaedia: require("../data/imgs/relics/encyclopaedia.png"),
  golfBall: require("../data/imgs/relics/golfBall.png"),
};
export const animationImages = {
  poof: require("../data/imgs/displayElements/poof.png"),
  bigPoof: require("../data/imgs/displayElements/bigPoof.png"),
  tinyPoof: require("../data/imgs/displayElements/tinyPoof.png"),
  tinyBunny: require("../data/imgs/displayElements/tinyBunny.png"),
  leapingbunnyFront: require("../data/imgs/displayElements/leapingbunnyFront.png"),
  leapingBunnyBack: require("../data/imgs/displayElements/leapingBunnyBack.png"),
};
export const displayElementImages = {
  backpackImage: require("../data/imgs/displayElements/backpack.png"),
  mythicCarpet: require("../data/imgs/displayElements/mythicCarpet.png"),
  greenCarpet: require("../data/imgs/displayElements/greenCarpet.png"),
  blueCarpet: require("../data/imgs/displayElements/blueCarpet.png"),
  deckImage: require("../data/imgs/displayElements/deck.png"),
  page: require("../data/imgs/displayElements/page.png"),
  senjafudaFrame: require("../data/imgs/displayElements/senjafudaFrame.png"),
  inkdrop: require("../data/imgs/displayElements/inkdrop.png"),
};
export const gemImages = {
  amber: require("../data/imgs/gems/amber.png"),
  aquamarine: require("../data/imgs/gems/aquamarine.png"),
  garnet: require("../data/imgs/gems/garnet.png"),
  lapisLazuli: require("../data/imgs/gems/lapisLazuli.png"),
  onyx: require("../data/imgs/gems/onyx.png"),
  tourmaline: require("../data/imgs/gems/tourmaline.png"),
  zircon: require("../data/imgs/gems/zircon.png"),
};
export const cardBacks = {
  reverse: require("../data/imgs/cardBacks/reverse.png"),
  basic: require("../data/imgs/cardBacks/basic.png"),
  blue: require("../data/imgs/cardBacks/blue.png"),
  cyan: require("../data/imgs/cardBacks/cyan.png"),
  green: require("../data/imgs/cardBacks/green.png"),
  magenta: require("../data/imgs/cardBacks/magenta.png"),
  misc: require("../data/imgs/cardBacks/misc.png"),
  red: require("../data/imgs/cardBacks/red.png"),
  white: require("../data/imgs/cardBacks/white.png"),
  yellow: require("../data/imgs/cardBacks/yellow.png"),
};
export const potions = {
  bunnyJar: require("../data/imgs/potions/bunnyJar.png"),
  characterPotion: require("../data/imgs/potions/characterPotion.png"),
  greaterGreenPotion: require("../data/imgs/potions/greaterGreenPotion.png"),
  greaterPurplePotion: require("../data/imgs/potions/greaterPurplePotion.png"),
  lesserGreenPotion: require("../data/imgs/potions/lesserGreenPotion.png"),
  lesserPurplePotion: require("../data/imgs/potions/lesserPurplePotion.png"),
  mediumGreenPotion: require("../data/imgs/potions/mediumGreenPotion.png"),
  mediumPurplePotion: require("../data/imgs/potions/mediumPurplePotion.png"),
  squidInk: require("../data/imgs/potions/squidInk.png"),
};
export const spellIcons = {
  bunnydouble: require("../data/imgs/spellIcons/bunnydouble.png"),
  bunnyfluff: require("../data/imgs/spellIcons/bunnyfluff.png"),
  bunnymancy: require("../data/imgs/spellIcons/bunnymancy.png"),
  conjurePages: require("../data/imgs/spellIcons/conjurePages.png"),
  echoingSplash: require("../data/imgs/spellIcons/echoingSplash.png"),
  freeBunnies: require("../data/imgs/spellIcons/freeBunnies.png"),
  goldenBunny: require("../data/imgs/spellIcons/goldenBunny.png"),
  inkswell: require("../data/imgs/spellIcons/inkswell.png"),
  ponder: require("../data/imgs/spellIcons/ponder.png"),
  scythe: require("../data/imgs/spellIcons/scythe.png"),
  sickle: require("../data/imgs/spellIcons/sickle.png"),
  timeFlip: require("../data/imgs/spellIcons/timeFlip.png"),
  timeWarp: require("../data/imgs/spellIcons/timeWarp.png"),
  tripleBunnies: require("../data/imgs/spellIcons/tripleBunnies.png"),
};
export const paths = {
  rest: require("../data/imgs/pathOfuda/rest.png"),
  shop: require("../data/imgs/pathOfuda/shop.png"),
  combat: require("../data/imgs/pathOfuda/combat.png"),
  highlightedrest: require("../data/imgs/pathOfuda/highlightedRest.png"),
  highlightedcombat: require("../data/imgs/pathOfuda/highlightedCombat.png"),
  highlightedshop: require("../data/imgs/pathOfuda/highlightedShop.png"),
  locked: require("../data/imgs/pathOfuda/lockedOverlay.png"),
};
export const characters = {
  witch: require("../data/imgs/characters/witch.png"),
  dragon: require("../data/imgs/characters/dragon.png"),
  goblin: require("../data/imgs/characters/goblin.png"),
  onion: require("../data/imgs/characters/onion.png"),
  carrot: require("../data/imgs/characters/carrot.png"),
};

import { renderBagExamine } from "./renderBagExamine";
import { renderDeckExamine } from "./renderDeckExamine";
import { renderCombat } from "./renderCombat";
//state functions

//renders
import { renderHud } from "./renderHud";
import { renderMythicSelection } from "./renderMythicSelection";
import { renderPathSelection } from "./renderPathSelection";

export function render(oldState) {
  let state = { ...oldState };
  console.log("arriving at render");

  if (state.currentScreen == "start") {
    showScreen("start");
  } else if (state.currentScreen === "difficultySelection") {
    showScreen("difficultySelection");
  } else if (state.currentScreen === "mythicSelection") {
    showScreen("mythicSelection");
    renderHud(state);
    renderMythicSelection(state);
  } else if (state.currentScreen === "deckExamine") {
    renderDeckExamine(state);
  } else if (state.currentScreen === "bagExamine") {
    renderBagExamine(state);
  } else if (state.currentScreen === "pathSelection") {
    showScreen("pathSelection");
    renderHud(state);
    renderPathSelection(state);
  } else if (state.currentScreen === "combat") {
    showScreen("combat");
    renderHud(state);
    renderCombat(state);
  } else {
    throw "unknown screen: " + state.currentScreen;
  }
}

//screen display toggle functions
function hideAllScreens() {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((screen) => {
    screen.style.display = "none";
  });
}

export function showScreen(screenId) {
  hideAllScreens(); // First hide all screens
  document.getElementById(screenId).style.display = "flex"; // Then show the desired screen
}

export function resumeGame(state) {
  if (state.previousScreen) {
    state.currentScreen = state.previousScreen;
    state.previousScreen = null;
    render(state);
  }
}
