"use strict";

//data
import { cardPool } from "./data/cardPool";
import { enemyPool } from "./data/enemyPool";
import { potionPool } from "./data/potionPool";
import { relicPool } from "./data/relicPool";
import { gemPool } from "./data/gemPool";
import { pathPool } from "./data/pathPool";
import { rewardPool } from "./data/rewardPool";

//utility functions
import { startPathSelection } from "./state/startPathSelection";

//game state functions
import { applyDifficultyLevel } from "./state/applyDifficultyLevel";
import { generateStarterDeck } from "./state/generateStarterDeck";
import { generateStarterRelics } from "./state/generateStarterRelics";

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
    enemyPool: enemyPool,
    rewardPool: rewardPool,
    potionPool: potionPool,
    maxHp: 100,
    hp: 100,
    gold: 0,
    level: 0,
    rewardLuck: 0,
    currentScreen: "pathSelection",
    presentedOptions: [],
    currentEnemy: null,
    enemyHp: 0,
    rabbitCount: 0,
    restHealAmount: 25,
    difficultyLevel: 1,
    class: "base",
    tempInkBonus: 0,
    commonRarity: 4,
    uncommonRarity: 3,
    rareRarity: 2,
    mythicRarity: 1,
  };
  state = applyDifficultyLevel(state);
  state = generateStarterDeck(state);
  state = generateStarterRelics(state);
  startPathSelection(state);
}

newGame();
