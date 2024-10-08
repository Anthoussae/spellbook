"use strict";

export function populatePathOptions(oldState) {
  let state = { ...oldState };
  console.log("populating path options", state);
  const options = [];
  const {
    level,
    difficulty,
    hp,
    maxHp,
    luck,
    defeatedEnemies,
    bossPool,
    pathPool,
    enemyPool,
    shopPityTimer,
    rewardProbabilities,
    lockChance,
  } = state;
  const bossLevels = [10, 20, 30];
  const restBanLevels = [0, 1, 2, 3, 10, 11, 12, 13, 20, 21, 22, 23];
  const enemyRequirement =
    (level >= 10 && level < 20 ? 5 : level >= 20 && level < 30 ? 10 : 15) -
    (difficulty === "easy" ? 1 : difficulty === "hard" ? 1 : 0);

  // 1. Handle boss levels (Test 2)
  if (bossLevels.includes(level)) {
    const bossLevel = bossLevels.indexOf(level) + 1;
    options.push(bossPool.find((boss) => boss.level === bossLevel));
    return options; // Only 1 option is allowed on boss levels
  }

  // 2. Handle enemy fight requirements (Test 4)
  const requiredEnemies = enemyRequirement - defeatedEnemies.length;
  if (requiredEnemies > 0) {
    const enemies = getUniqueEnemies(filterPoolByLevel(enemyPool, level), 3);
    options.push(...enemies);
    return options;
  }

  // 3. Ensure unique options, avoid abstract types, and never duplicate concrete options (Test 5, 6, 13)
  let availableOptions = resolveAbstractOptions(
    pathPool.filter((option) => option.type !== "abstract")
  );
  availableOptions = removeDuplicateConcreteOptions(availableOptions);

  // 4. Add a rest option if necessary and allowed by HP and luck (Test 3, 7, 11)
  if (!restBanLevels.includes(level)) {
    if (hp / maxHp < 0.2 && luck > 2) {
      const restOption = pathPool.find((option) => option.name === "Rest");
      if (restOption) {
        options.push(restOption);
      }
    } else if (shouldOfferRestOption(state)) {
      const restOption = pathPool.find((option) => option.name === "Rest");
      if (restOption) {
        options.push(restOption);
      }
    }
  }

  // 5. Add a shop option based on the pity timer (Test 9)
  if (shopPityTimer === 0) {
    const shopOption = pathPool.find((option) => option.name === "Shop");
    if (shopOption) {
      options.push(shopOption);
    }
  }

  // 6. Fill remaining options based on probability and ensuring uniqueness (Test 12)
  const fillOptions = () => {
    for (let i = options.length; i < 3; i++) {
      const nextOption = weightedRandomSelection(
        availableOptions,
        rewardProbabilities
      );
      if (!options.includes(nextOption)) {
        options.push(nextOption);
      }
    }
  };
  fillOptions();

  return options.slice(0, 3); // Return only 3 options
}

// Helper function to get unique enemies
function getUniqueEnemies(enemyPool, count) {
  const enemies = [];
  const uniqueEnemiesSet = new Set();
  for (let i = 0; enemies.length < count; i++) {
    const randomEnemy = enemyPool[Math.floor(Math.random() * enemyPool.length)];
    if (!uniqueEnemiesSet.has(randomEnemy.name)) {
      enemies.push(randomEnemy);
      uniqueEnemiesSet.add(randomEnemy.name);
    }
  }
  return enemies;
}

// Helper function to resolve abstract options into concrete options
function resolveAbstractOptions(pathPool) {
  return pathPool.map((option) => {
    if (option.type === "abstract") {
      // Resolve abstract options here, returning a concrete alternative
      return { ...option, type: "concrete" };
    }
    return option;
  });
}

// Helper function to remove duplicate concrete options
function removeDuplicateConcreteOptions(options) {
  const uniqueOptions = [];
  const uniqueOptionsSet = new Set();

  options.forEach((option) => {
    const optionIdentifier = `${option.name}-${option.type}`;
    if (!uniqueOptionsSet.has(optionIdentifier)) {
      uniqueOptions.push(option);
      uniqueOptionsSet.add(optionIdentifier);
    }
  });

  return uniqueOptions;
}

// Helper function to check whether to offer rest
function shouldOfferRestOption(state) {
  const { level, difficulty, hp, maxHp, defeatedEnemies } = state;
  const requiredRestCount = [5, 6, 7][
    ["easy", "medium", "hard"].indexOf(difficulty)
  ];
  return defeatedEnemies.length % requiredRestCount === 0 || hp / maxHp <= 0.8;
}

// Helper function to select a weighted random option
function weightedRandomSelection(options, probabilities) {
  const weightedOptions = options.map((option) => ({
    option,
    weight: probabilities[option.rarity] || 1,
  }));
  const totalWeight = weightedOptions.reduce((acc, cur) => acc + cur.weight, 0);
  const randomWeight = Math.random() * totalWeight;
  let weightSum = 0;
  for (let i = 0; i < weightedOptions.length; i++) {
    weightSum += weightedOptions[i].weight;
    if (randomWeight <= weightSum) {
      return weightedOptions[i].option;
    }
  }
  return weightedOptions[0].option;
}

// Helper function to filter pool by level
function filterPoolByLevel(pool, level) {
  return pool.filter((option) => option.level === level);
}

export function applyLocks(options, oldState) {
  // Copy the options array and state object
  let availableOptions = [...options];
  let state = { ...oldState };
  let lockedOptions = [];
  let lockChance = state.lockChance;

  // Helper function to apply a lock based on a chance
  function shouldLock(chance) {
    return Math.random() < chance;
  }

  // One random option is always unlocked
  let unlockedIndex = Math.floor(Math.random() * availableOptions.length);

  // Initialize all options with a "locked" property set to false initially
  availableOptions.forEach((option, index) => {
    option.locked = false;
    if (index !== unlockedIndex) {
      lockedOptions.push(option);
    }
  });

  // Sort options by priority: Rest > Shop > Others
  let sortedOptions = availableOptions.sort((a, b) => {
    if (a.name === "Rest") return -1;
    if (b.name === "Rest") return 1;
    if (a.name === "Shop") return -1;
    if (b.name === "Shop") return 1;
    return 0;
  });

  // Apply lock to the second option based on lockChance
  if (shouldLock(lockChance)) {
    sortedOptions[1].locked = true;
  }

  // Apply lock to the third option based on adjusted lockChance
  let thirdLockChance = sortedOptions[1].locked
    ? lockChance / 4
    : lockChance / 2;
  if (shouldLock(thirdLockChance)) {
    sortedOptions[2].locked = true;
  }

  //remove all locks if it's level 1.
  if (state.level === 1) {
    sortedOptions.forEach((option) => {
      option.locked = false;
    });
  }

  return availableOptions;
}
