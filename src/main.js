"use strict";
//minor

//create the luck mechanic.
//tooltips should display full card effects.
//tooltips should be helpful, and reflect gem effects.
//malachite is bugged

// fix color display in "render deck examine" so that card colors are displayed correctly.
// make a favicon
// make the shop render.
// the shop should always include either a quill, an inkbottle, or a page. The first costs 10 gold, then incrementally 20, 30, etc.
// you start the game with 50 gold in the shop.
// the shop has a row of gems, a row of relics (one of which is one of the above 3), a row of cards, and a row of potions.
//currently socketing a gem automatically takes you to path selection. It should be fixed so that if you're in a shop, it takes you back to shop selection.

//major bug: Occasionally randomly skips through a screen. Reason unclear, no error message.

//very minor bug: when clicking socket, receives this error message:
//    render.js:72 Uncaught TypeError: Cannot read properties of undefined (reading 'hp')
//     at renderHud (render.js:72:26)
//     at HTMLButtonElement.<anonymous> (render.js:62:7)
// seems to be that the socketing buttons triggger a renderHUD call without a state.

//major
// redo display to be vastly more attractive

//distant:
// combat mechanic
// art assets
// add data
// design triggers and trigger listeners

//data
import { cardPool } from "./data/cardPool";
import { enemyPool } from "./data/enemyPool";
import { potionPool } from "./data/potionPool";
import { relicPool } from "./data/relicPool";
import { gemPool } from "./data/gemPool";
import { pathPool } from "./data/pathPool";
import { rewardPool } from "./data/rewardPool";
import { classPool } from "./data/classPool";
import { challengePool } from "./data/challengePool";

//utility functions
import { startPathSelection } from "./state/startPathSelection";
import { generateColor } from "./util/generateColor";

//game state functions
import { applyDifficultyLevel } from "./state/startup/applyDifficultyLevel";
import { generateStarterDeck } from "./state/startup/generateStarterDeck";
import { insertRelic } from "./state/insertRelic";
import { colorize } from "./state/startup/colorize";
import { populateEnemyPool } from "./state/startup/populateEnemyPool";
import { insertCard } from "./state/insertCard";
import { findObjectInArray } from "./util/findObjectInArray";

// make sure tehre's combat values for everything.
//new game creates a non-global state object and passes it to the path selection screen.
export function newGame() {
  console.log("new game");
  let state = {
    deck: [],
    combatDeck: [],
    hand: [],
    graveyard: [],
    relicBelt: [],
    spellBook: [],
    pages: 3,
    combatPages: 0,
    relicPool: relicPool,
    cardPool: cardPool,
    gemPool: gemPool,
    pathPool: pathPool,
    enemyPool: populateEnemyPool(),
    rewardPool: rewardPool,
    potionPool: potionPool,
    maxHp: 100,
    hp: 100,
    gold: 50,
    level: 0,
    handSize: 4,
    combatHandSize: 0,
    mulligans: 1,
    combatMulligans: 0,
    currentScreen: "pathSelection",
    previousScreen: null,
    presentedOptions: [],
    currentEnemy: null,
    enemyHp: 0,
    lastEnemyHp: 0,
    lastCombatResult: null,
    bounty: 0,
    bunnies: 0,
    casting: 0,
    lastBunnies: 0,
    restHealAmount: 25,
    difficultyLevel: 1,
    luck: 1,
    characterClas: "base",
    ink: 4,
    combatInk: 0,
    tempInkBonus: 0,
    rewardProbabilities: {
      common: 12,
      uncommon: 5,
      rare: 2,
      mythic: 1,
    },
    wandUpgrade: {
      name: "Wand Upgrade",
      type: "concrete",
      rarity: "common",
      effect: "wand upgrade",
      wandUpgradeAmount: 5,
    },
    color: {
      R: generateColor(),
      G: generateColor(),
      B: generateColor(),
    },
    overallColor: "none",
    discount: 0,
    challengePool: challengePool,
    classPool: classPool,
    defeatedEnemies: [],
    bonusBunnies: 0,
    selectedReward: null,
    selectedCard: null,
    shopWares: [],
  };

  //ultimately, difficulty level and class will be set by user selection.
  state = generateStarterDeck(state);
  state = insertRelic(state, "Magic Wand");
  state = applyDifficultyLevel(state);
  state = colorize(state);

  //debugger
  // state = insertCard(state, findObjectInArray(cardPool, "name", "Harvest"));
  // state = insertRelic(state, "Quill");

  //begin game
  startPathSelection(state);
}

newGame();
