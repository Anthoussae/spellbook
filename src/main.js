"use strict";

//add small icons for relic buffs.

//make a concede button that transitions to an end-game 'you lose' screen with stats. When you close that screen, bunny screen transition plays and takes you back to the main menu.
//the above you lose screen is also displayed when you lose.

//add credits

//add tutorial

//add darkmnode

//when you select an option, the others vanish in a puff of smoke with bunnies

//when upgrading cards, a puff of magic surrounds deck.

// make a favicon

//add shadows to cards.

//various relic tooltips need to be adjusted.

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
import { mythicPool } from "./data/mythicPool";
import { bossPool } from "./data/bossPool";

//utility functions
import { startPathSelection } from "./state/screenChanges/startPathSelection";
import { generateColor } from "./util/generateColor";

//game state functions
import { startShop } from "./state/screenChanges/startShop";
import { generateStarterDeck } from "./state/startup/generateStarterDeck";
import { insertRelic } from "./state/insertRelic";
import { colorize } from "./state/startup/colorize";
import { populateEnemyPool } from "./state/startup/populateEnemyPool";
import { insertCard } from "./state/insertCard";
import { findObjectInArray } from "./util/findObjectInArray";
import { startDifficultySelection } from "./state/screenChanges/startDifficultySelection";
import { populateMythicRewards } from "./state/startup/populateMythicRewards";
import { advanceScreen } from "./state/screenChanges/advanceScreen";

class Game {
  constructor() {
    this.state = {
      lockChance: 0.3,
      keys: 1,
      deck: [],
      combatDeck: [],
      hand: [],
      graveyard: [],
      relicBelt: [],
      spellBook: [],
      bossPool: bossPool,
      pages: 3,
      combatPages: 0,
      relicPool: relicPool,
      cardPool: cardPool,
      gemPool: gemPool,
      pathPool: pathPool,
      enemyPool: populateEnemyPool(),
      rewardPool: rewardPool,
      potionPool: potionPool,
      mythicPool: mythicPool,
      maxHp: 100,
      previousMaxHp: 100,
      hp: 100,
      gold: 50,
      previousHp: 100,
      previousGold: 50,
      level: 0,
      handSize: 4,
      combatHandSize: 0,
      mulligans: 1,
      combatMulligans: 0,
      currentScreen: "startScreen",
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
      castBunnies: 0,
      restHealAmount: 25,
      difficulty: null,
      shopPityTimer: 5,
      luck: 1,
      characterClas: "base",
      ink: 5,
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
      selectedPath: null,
      shopWares: [],
      mythicRewards: [],
      shield: 0,
    };
  }

  resetState() {
    this.state = {
      lockChance: 0.5,
      keys: 1,
      deck: [],
      combatDeck: [],
      hand: [],
      graveyard: [],
      relicBelt: [],
      spellBook: [],
      bossPool: bossPool,
      pages: 3,
      combatPages: 0,
      relicPool: relicPool,
      cardPool: cardPool,
      gemPool: gemPool,
      pathPool: pathPool,
      enemyPool: populateEnemyPool(),
      rewardPool: rewardPool,
      potionPool: potionPool,
      mythicPool: mythicPool,
      maxHp: 100,
      previousMaxHp: 100,
      hp: 100,
      gold: 50,
      previousHp: 100,
      previousGold: 50,
      level: 0,
      handSize: 4,
      combatHandSize: 0,
      mulligans: 1,
      combatMulligans: 0,
      currentScreen: "startScreen",
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
      castBunnies: 0,
      restHealAmount: 25,
      difficulty: null,
      shopPityTimer: 5,
      luck: 1,
      characterClas: "base",
      ink: 5,
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
      selectedPath: null,
      shopWares: [],
      mythicRewards: [],
      shield: 0,
    };
  }

  newGame() {
    console.log("new game");
    this.resetState(); // Reset the game state
    this.state = generateStarterDeck(this.state);
    console.log(this.state, "new game state");
    this.state = insertRelic(this.state, "Magic Wand");
    this.state = populateMythicRewards(this.state);

    // Debugging
    // this.state = insertCard(this.state, findObjectInArray(this.state.cardPool, "name", "Harvest"));
    // this.state = insertRelic(this.state, "Quill");

    // Begin game
    advanceScreen(this.state);
  }
}

//fullscreen button
document.getElementById("fullscreenBtn").addEventListener("click", function () {
  const gameContainer = document.getElementById("gameContainer");

  if (!document.fullscreenElement) {
    // Enter fullscreen mode
    if (gameContainer.requestFullscreen) {
      gameContainer.requestFullscreen();
    } else if (gameContainer.mozRequestFullScreen) {
      // Firefox
      gameContainer.mozRequestFullScreen();
    } else if (gameContainer.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) {
      // IE/Edge
      gameContainer.msRequestFullscreen();
    }
  } else {
    // Exit fullscreen mode
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  }
});

//new game button
document.getElementById("newGameBtn").addEventListener("click", function () {
  game.newGame();
});

// Create a new game instance
const game = new Game();
