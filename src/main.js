"use strict";

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
import { applyDifficultyLevel } from "./state/applyDifficultyLevel";
import { generateStarterDeck } from "./state/generateStarterDeck";
import { insertRelic } from "./state/insertRelic";
import { colorize } from "./state/colorize";
import { populateEnemyPool } from "./state/populateEnemyPool";

//new game creates a non-global state object and passes it to the path selection screen.
function newGame() {
  console.log("new game");
  let state = {
    deck: [],
    hand: [],
    graveyard: [],
    relicBelt: [],
    spellBook: [],
    relicPool: relicPool,
    cardPool: cardPool,
    gemPool: gemPool,
    pathPool: pathPool,
    enemyPool: populateEnemyPool(),
    rewardPool: rewardPool,
    potionPool: potionPool,
    maxHp: 100,
    hp: 100,
    gold: 0,
    level: 0,
    currentScreen: "pathSelection",
    presentedOptions: [],
    currentEnemy: null,
    enemyHp: 0,
    rabbitCount: 0,
    restHealAmount: 25,
    difficultyLevel: 1,
    characterClas: "base",
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
    discount: 1,
    challengePool: challengePool,
    classPool: classPool,
    defeatedEnemies: [],
    bonusBunnies: 0,
  };
  //ultimately, difficulty level and class will be set by user selection.
  state = generateStarterDeck(state);
  state = insertRelic(state, "Magic Wand");
  state = applyDifficultyLevel(state);
  state = colorize(state);
  startPathSelection(state);
}

newGame();
