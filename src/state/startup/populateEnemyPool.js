"use strict";

export function populateEnemyPool() {
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
