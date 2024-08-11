"use strict";

// bugged (enemy level is bugged)
//fix this. Doesn't correctly clear and reset state.

import { cardPool } from "../data/cardPool";
import { gemPool } from "../data/gemPool";
import { pathPool } from "../data/pathPool";
import { rewardPool } from "../data/rewardPool";
import { potionPool } from "../data/potionPool";
import { relicPool } from "../data/relicPool";
import { challengePool } from "../data/challengePool";
import { classPool } from "../data/classPool";
import { populateEnemyPool } from "./startup/populateEnemyPool";
import { generateStarterDeck } from "./startup/generateStarterDeck";
import { insertRelic } from "./insertRelic";
import { applyDifficultyLevel } from "./startup/applyDifficultyLevel";
import { colorize } from "./startup/colorize";
import { startPathSelection } from "./startPathSelection";
import { generateColor } from "../util/generateColor";

export function resetState(oldState) {
  console.log("new game!");
  let state = { ...oldState };
  state = {
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
