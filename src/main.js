"use strict";

//lets set some predefined variables etc. in CSS.

//add credits

//add tutorial

//add disclaimer @ breakpoint - "this game is in development, and is not optimized for small screens. Please re-open in a desktop browser."

//add darkmnode

//current
// make it pretty

//for relic belt
//if the contents is over ~8, make it scrollable.
// a good way to do that is to make the belt a flexbox, and then make the contents a flexbox as well.?
//alternatively, draw arrow key icons, design a belt render that renders "displayed relics", and the arrow keys are buttons that shift the "dusplayed relics"  windw.

//when you select an option, the others vanish in a puff of smoke with bunnies
//make a "bag" button where relics that trigger on pickup only are kept (in the bottom right hand corner)
//make the deck button cute
//design card frames. Should include a socket space for gems, and a space for illustration.
//two card versions: Small and Large. Small has no text, large does.
//(urgent) fix the belt box sizing (urgent)
//tidy the wand upgrade logic. Should now track an attribute "upgraded"
//every 7 levels you get a mythic. (eg., lvl 1, lvl 8, lvl 15.) No repeat relics offered. Let's design at least 12 mythic relics.
//minor

//add italic effect text to cards in deck examine
//add tooltips to hand cards
//add tooltips to spellbook cards
//rounded edges for cards
//ink cost appears in socketing
//wand upgrade can appear twice, fix that
//shop pity timer (shop guaranteed every 5 fights)
//console error when you cast (doesn't seem to affect logic).
//show ink cost when socketing
//add colors and reward type to reward selection, and make it look better.
//make sure that battlehud doesn't display fractions - math.floor everything..
//clear the renderBattlehud after combat (when entering pathselection)

//create the luck mechanic.

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

//distant:

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

//utility functions
import { startPathSelection } from "./state/startPathSelection";
import { generateColor } from "./util/generateColor";

//game state functions
import { startShop } from "./state/startShop";
import { applyDifficultyLevel } from "./state/startup/applyDifficultyLevel";
import { generateStarterDeck } from "./state/startup/generateStarterDeck";
import { insertRelic } from "./state/insertRelic";
import { colorize } from "./state/startup/colorize";
import { populateEnemyPool } from "./state/startup/populateEnemyPool";
import { insertCard } from "./state/insertCard";
import { findObjectInArray } from "./util/findObjectInArray";
import { startDifficultySelection } from "./state/startDifficultySelection";
import { populateMythicRewards } from "./state/startup/populateMythicRewards";

class Game {
  constructor() {
    this.state = {
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
      mythicPool: mythicPool,
      maxHp: 100,
      hp: 100,
      gold: 50,
      previousHp: 100,
      previousGold: 50,
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
      shopWares: [],
      mythicRewards: [],
    };
  }

  resetState() {
    this.state = {
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
      mythicPool: mythicPool,
      maxHp: 100,
      hp: 100,
      gold: 50,
      previousHp: 100,
      previousGold: 50,
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
      shopWares: [],
      mythicRewards: [],
    };
  }

  newGame() {
    console.log("new game");
    this.resetState(); // Reset the game state
    this.state = generateStarterDeck(this.state);
    this.state = insertRelic(this.state, "Magic Wand");
    this.state = populateMythicRewards(this.state);
    // this.state = applyDifficultyLevel(this.state);
    // this.state = colorize(this.state);

    // Debugging
    // this.state = insertCard(this.state, findObjectInArray(this.state.cardPool, "name", "Harvest"));
    // this.state = insertRelic(this.state, "Quill");

    // Begin game
    startDifficultySelection(this.state);
    // startShop(this.state);
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
