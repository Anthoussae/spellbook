"use strict";
import { buffPool } from "../../data/buffPool";
import { pickN } from "../../util/pickN";
import { randomIntegerBetweenXAndYInclusive } from "../../util/randomIntegerBetweenXAndYInclusive";

export function generateBuffs(enemy) {
  let newEnemy = { ...enemy };
  newEnemy.buffs = [];

  if (newEnemy.monsterClass != "Basic") {
    if (newEnemy.monsterClass === "Elite") {
      newEnemy.buffs = pickN(
        buffPool,
        randomIntegerBetweenXAndYInclusive(1, 2),
        { duplicatesAllowed: true }
      );
    } else if (newEnemy.monsterClass === "Enchanted") {
      newEnemy.buffs = pickN(
        buffPool,
        randomIntegerBetweenXAndYInclusive(2, 3),
        { duplicatesAllowed: true }
      );
    } else if (newEnemy.monsterClass === "Boss") {
      newEnemy.buffs = pickN(buffPool, 3, { duplicatesAllowed: true });
    }
  }
  return newEnemy;
}
