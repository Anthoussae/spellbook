"use strict";

//add small icons for relic buffs.

//make a concede button that transitions to an end-game 'you lose' screen with stats. When you close that screen, bunny screen transition plays and takes you back to the main menu.
//the above you lose screen is also displayed when you lose.

//make interesting relics that modify gameplay substantially.
//relic: whenever you add a card to your deck, gain +5 max HP.
//relic: whenever you play a socketed card, dispel an enemy buff.
//relic: all lesser potions are upgraded to medium potions and discounted by 1 tier.
//relic: All cards with 5 or more upgrades cost 1 less ink.
//relic: you gain +2 ink, but can no longer rest.
//relic: you gain +2 pages, but gain 50% less gold.
//relic: you gain +3 hand size, but all healing is reduced by 50%.
//relic: whenever you heal, upgrade a random card.
//relic: All gems are onyx.

//decide on reward mechanics, path tree, and shop design

//lets set some predefined variables etc. in CSS.

//seems to be triggering set difficulty for each button, rather than assigning it to onclick.

//screen judder on relic selection.

//add credits

//add tutorial

//add disclaimer @ breakpoint - "this game is in development, and is not optimized for small screens. Please re-open in a desktop browser."

//add darkmnode

//fix the picture for bottomless inkpot

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
      shopWares: [],
      mythicRewards: [],
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
