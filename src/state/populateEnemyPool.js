"use strict";

export function populateEnemyPool() {
  const enemyPool = [];
  for (let i = 0; i < 200; i++) {
    const enemy = {
      name: i + " Carrots",
      level: Math.floor(i / 10),
      maxHp: i,
      hp: i,
      goldReward: i,
      type: "concrete",
      screen: "combat",
      rarity: "common",
      supertype: "enemy",
    };
    enemyPool.push(enemy);
  }
  return enemyPool;
}
