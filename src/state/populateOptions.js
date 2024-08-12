"use strict";

import { checkDuplicates } from "../util/checkDuplicates";
import { repeatAction } from "../util/repeatAction";
import { pickN } from "../util/pickN";

export function populateOptions(oldState) {
  let state = { ...oldState };
  const rarities = state.rewardProbabilities;
  const replacementItem = state.wandUpgrade;
  const currentScreen = state.currentScreen;
  const concretePools = {
    card: state.cardPool,
    gem: state.gemPool,
    potion: state.potionPool,
    enemy: state.enemyPool,
    relic: state.relicPool,
  };
  let pool = [];
  if (
    state.currentScreen == "shop" ||
    state.currentScreen == "rewardSelection"
  ) {
    pool = state.rewardPool;
  } else if (state.currentScreen == "pathSelection") {
    pool = state.pathPool;
  } else {
    throw "unknown screen: " + state.currentScreen;
  }
  let activePool = weighPool(pool, rarities);
  let mixedOptions = pickN(activePool, 3, {
    duplicatesAllowed: true,
  });
  let concreteOptions = [];
  //concretize
  for (let i = 0; i < mixedOptions.length; i++) {
    let mixedOption = mixedOptions[i];
    if (
      mixedOption.type == "concrete" &&
      !checkDuplicates(concreteOptions, mixedOption)
    ) {
      concreteOptions.push(mixedOption);
    } else if (
      mixedOption.type == "concrete" &&
      checkDuplicates(concreteOptions, mixedOption)
    ) {
      concreteOptions.push(replacementItem);
    } else if (mixedOption.type == "abstract") {
      let concretePool = concretePools[mixedOption.name];
      if (mixedOption.name == "enemy") {
        concretePool = filterPoolByLevel(concretePool, state.level);
      }
      let weightedConcretePool = weighPool(concretePool, rarities);
      let concreteOption = pickN(weightedConcretePool, 1, {
        duplicatesAllowed: false,
      });
      concreteOptions.push(concreteOption[0]);
    }
  }
  concreteOptions = extraordinaryDuplicateCatcher(
    concreteOptions,
    replacementItem
  );

  state.presentedOptions = concreteOptions;
  return state;
}

function extraordinaryDuplicateCatcher(array, replacementItem) {
  let replacementArray = [...array];
  for (let i = 0; i < replacementArray.length; i++) {
    let item = replacementArray[i];
    for (let j = 0; j < replacementArray.length; j++) {
      if (i != j && item.name == replacementArray[j].name) {
        replacementArray[j] = replacementItem;
      }
    }
  }
  return replacementArray;
}

function weighPool(cardPool, rarities) {
  let pool = cardPool;
  let weightedPool = [];
  pool.forEach((option) => {
    repeatAction(rarities[option.rarity], () => {
      weightedPool.push(option);
    });
  });
  return weightedPool;
}

function filterPoolByLevel(pool, level) {
  return pool.filter((option) => option.level === level);
}
