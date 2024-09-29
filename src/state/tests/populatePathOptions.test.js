"use strict";
import { populatePathOptions } from "../populatePathOptions";

//this test suite is bugged for now. It "cannot find module".
//sample boss pool for testing purposes:

export const bossPool = [
  {
    hp: 100,
    name: "Bokchoi Balrog",
    level: 1,
    goldReward: 100,
    type: "concrete",
    screen: "combat",
    rarity: "mythic",
    supertype: "boss",
  },
  {
    hp: 200,
    name: "Tarragon Tarrasque",
    level: 2,
    goldReward: 200,
    type: "concrete",
    screen: "combat",
    rarity: "mythic",
    supertype: "boss",
  },
  {
    hp: 300,
    name: "Dragonfruit Dragon",
    level: 3,
    goldReward: 300,
    type: "concrete",
    screen: "combat",
    rarity: "mythic",
    supertype: "boss",
  },
];

//sample path pool for testing purposes:
const pathPool = [
  {
    name: "enemy",
    rarity: "common",
    type: "abstract",
  },
  {
    name: "Rest",
    rarity: "mythic",
    type: "concrete",
  },
  {
    name: "Shop",
    rarity: "mythic",
    type: "concrete",
  },
];

//sample enemy pool generation function for testing purposes:
function populateEnemyPool() {
  const enemyPool = [];
  for (let i = 0; i < 300; i++) {
    const enemy = {
      hp: Math.max(i - 5, 5),
      name: "",
      level: Math.floor(i / 10),
      goldReward: Math.floor(Math.random() * (30 - 15 + 1)) + 15,
      type: "concrete",
      screen: "combat",
      rarity: "common",
      supertype: "enemy",
      //monsterClass should randomly be one of "elite", "enchanted", or "basic"
      monsterClass: ["elite", "enchanted", "basic"][
        Math.floor(Math.random() * 3)
      ],
    };
    enemy.name = generateRandomName() + " (" + enemy.hp + ")";
    enemyPool.push(enemy);
  }
  return enemyPool;
}

function generateRandomName() {
  const fantasyMonsterNames = [
    "Goblin",
    "Orc",
    "Dark Elf",
    "Giant Spider",
    "Troll",
    "Minotaur",
    "Kobold",
    "Lich",
    "Ogre",
    "Banshee",
    "Wyvern",
    "Hobgoblin",
    "Manticore",
    "Ghoul",
    "Griffin",
    "Hydra",
    "Wraith",
    "Beholder",
    "Gnoll",
    "Bugbear",
  ];

  const commonVegetables = [
    "Carrot",
    "Cabbage",
    "Broccoli",
    "Spinach",
    "Lettuce",
    "Tomato",
    "Cucumber",
    "Potato",
    "Onion",
    "Garlic",
    "Bell Pepper",
    "Zucchini",
    "Cauliflower",
    "Peas",
    "Green Beans",
    "Radish",
    "Eggplant",
    "Celery",
    "Asparagus",
    "Sweet Corn",
  ];

  // Select a random term from each array
  const randomMonster =
    fantasyMonsterNames[Math.floor(Math.random() * fantasyMonsterNames.length)];
  const randomVegetable =
    commonVegetables[Math.floor(Math.random() * commonVegetables.length)];

  // Combine the terms to form a name
  return ` ${randomVegetable} ${randomMonster}`;
}

//sample difficulties for testing purposes:
const difficulties = ["easy", "medium", "hard"];

//sample state for testing purposes:
let pathOptionsTestState = {
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
  pathPool: pathPool,
  enemyPool: populateEnemyPool(),
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
  overallColor: "none",
  discount: 0,
  defeatedEnemies: [],
  bonusBunnies: 0,
  selectedReward: null,
  selectedCard: null,
  shopWares: [],
  mythicRewards: [],
};

// Sample test case
test("1: populatePathOptions should return an array with three objects, except on level 10, 20, and 30", () => {
  // Create a copy of the test state
  let testState = { ...pathOptionsTestState };

  // Set the level to something other than 10, 20, or 30 (e.g., level 5)
  testState.level = 5;

  // Call the populatePathOptions function
  const result = populatePathOptions(testState);

  // Check that the result is an array with exactly 3 objects
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBe(3);

  // Now test level 10, where the behavior might differ
  testState.level = 10;

  // Call the populatePathOptions function again
  const resultAtLevel10 = populatePathOptions(testState);

  // Since you expect a different behavior at level 10, adjust the expectation
  // For example, if it should return 1 object instead of 3
  expect(resultAtLevel10.length).not.toBe(3); // Adjust this based on actual behavior
});

test("2: populatePathOptions should return an array with one object - a boss enemy, selected from state.bossPool - on levels 10, 20, and 30. A level 1 boss for lvl 10, level 2 for lvl 20, and lvl 3 for level 30", () => {
  //code
});

test("3: populatePathOptions should never include a rest option if level is 0-3, 10-13, or 20-23", () => {
  //code
});

test("4: by level 10, the player must have selected at least 5 enemies to fight. This can be forced in populatePathOptions by offering sets of 3 enemies. The same is true for 10 enemies by level 20, and 15 by level 30. -1 for easy mode, +1 for hard mode.", () => {
  //code
});

test("5: populatePathOptions should never return an array with two of the same concrete option.", () => {
  //code
});

test("6: for each level apart from boss levels, between 0 and 3 enemies are presented. The enemies must all have different names and monsterClasses (the monsterClasses are 'elite', 'enchanted', and 'basic').", () => {
  //code
});
test("7: If a player has less than 20% HP and more than 2 luck, populatePathOptions should include a rest option if possible (does not supersede rule 4 above)", () => {
  //code
});
test("8: Each point of luck a player has increases the chance of a rest option appearing by 5%, and a shop by 5%, and a special event by 5%.", () => {
  //code
});
test("9: There is a pity timer for shops. If a player hasn't been offered a shop in 4/5/6 levels (easy/medium/hard), the next level will always include a shop.", () => {
  //code
});
test("10: There is a pity timer for rests. If a player hasn't been offered a rest in 5/6/7 levels (easy/medium/hard), the next level will always include a rest.", () => {
  //code
});
test("11: There is a QOL for rests. If a player has > 80% HP, they will never be offered a rest.", () => {
  //code
});
test("12: The objects in populatePathOptions are randomly selected from the state.pathPool. The base probability of selecting each object is determined by state.rewardProbabilities and the object's rarity. It is further modified by the various rules outlined in this test.", () => {
  //code
});
test("13: populatePathOptions should never return an array with any abstract options in it. All abstract options must be resolved into appropriate concrete options.", () => {
  //code
});
