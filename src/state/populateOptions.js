"use strict";

import { checkDuplicates } from "../util/checkDuplicates";

//input state, outputs a new state with the state.presentedOptions array populated with an array containing 3 options.

export function populateOptions(state) {
  state = { ...state };
  if (state.currentScreen === "pathSelection") {
    const rarityWeightedGenericPaths = rarifyArray(state.pathPool, state);
    const genericPaths = pickN(rarityWeightedGenericPaths, 3, {
      duplicatesAllowed: true,
    });
    const concretePaths = concretizeOptions(genericPaths, state);
    state.presentedOptions = concretePaths;

    return state;
  } else if (state.currentScreen === "rewardSelection") {
    const currentLevelGenericRewards = filterArrayByLevel(
      state.rewardPool,
      state.level + state.rewardLuck,
      state.level + state.rewardLuck
    );
    const rarityWeightedGenericRewards = rarifyArray(
      currentLevelGenericRewards,
      state
    );
    const genericRewards = pickN(rarityWeightedGenericRewards, 3, {
      duplicatesAllowed: true,
    });
    const concreteRewards = concretizeOptions(genericRewards, state);
    state.presentedOptions = concreteRewards;

    return state;
  } else {
    throw "unknown screen: " + state.currentScreen;
  }
}

//input an array of objects and a lower and upper limit of level, outputs a new array filtered by levelMin and levelMax of the objects in the input array.
function filterArrayByLevel(array, levelMin, levelMax) {
  return array.filter((e) => e.level >= levelMin && e.level <= levelMax);
}

//input an array of objects, a count, and a boolean indicating if duplicates are permitted. Outputs an array of count length with objects from the input array. If duplicates are not permitted, output does not contain duplicates.
function pickN(array, count, { duplicatesAllowed = false } = {}) {
  array = [...array];
  const result = [];

  if (duplicatesAllowed) {
    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * array.length);
      result.push(array[index]);
    }
    return result;
  } else if (!duplicatesAllowed) {
    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * array.length);
      const item = array[index];
      //as long as result does not already contain the item, push it to result.
      if (!result.includes(item)) {
        result.push(item);
      } else {
        //if result already contains the item, decrement i to try again.
        i--;
      }
    }
    return result;
  }
}

//inputs an array of objects with rarity properties and state. Outputs an array with the objects weighted based on their rarity and the frequency that each rarity should occur (determined from the state properties 'xyzRarity').

function rarifyArray(array, state) {
  console.log(state);
  const rarifiedArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].rarity == "common") {
      for (let j = 0; j < state.commonRarity; j++) {
        rarifiedArray.push(array[i]);
      }
    } else if (array[i].rarity == "uncommon") {
      for (let j = 0; j < state.uncommonRarity; j++) {
        rarifiedArray.push(array[i]);
      }
    } else if (array[i].rarity == "rare") {
      for (let j = 0; j < state.rareRarity; j++) {
        rarifiedArray.push(array[i]);
      }
    } else if (array[i].rarity == "mythic") {
      for (let j = 0; j < state.mythicRarity; j++) {
        rarifiedArray.push(array[i]);
      }
    } else {
      throw "unknown rarity: " + array[i].rarity;
    }
  }
  return rarifiedArray;
}

//this function takes an array of generic options and replaces each one (except rest) with a concrete option. The exact same concrete option won't be offered in the same set.
function concretizeOptions(array, state) {
  console.log(array, state);
  let concreteOptions = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].name == "card") {
      let card = pickN(state.rarifyArray(state.cardPool), 1, {
        duplicatesAllowed: false,
      });
      if (!checkDuplicates(concreteOptions, card)) {
        concreteOptions.push(card);
      } else {
        i--;
      }
    } else if (array[i].name == "relic") {
      let relic = pickN(state.rarifyArray(state.relicPool), 1, {
        duplicatesAllowed: false,
      });
      if (
        !checkDuplicates(concreteOptions, relic) &&
        !checkDuplicates(state.relicBelt, relic)
      ) {
        concreteOptions.push(relic);
      } else {
        i--;
      }
    } else if (array[i].name == "gem") {
      let gem = pickN(state.rarifyArray(state.gemPool), 1, {
        duplicatesAllowed: false,
      });
      if (!checkDuplicates(concreteOptions, gem)) {
        concreteOptions.push(gem);
      } else {
        i--;
      }
    } else if (array[i].name == "combat") {
      let enemy = pickN(
        rarifyArray(
          filterArrayByLevel(state.enemyPool, state.level, state.level),
          state
        ),
        1,
        {
          duplicatesAllowed: false,
        }
      );
      if (!checkDuplicates(concreteOptions, combat)) {
        concreteOptions.push(enemy);
      } else {
        i--;
      }
    } else if (array[i].name == "rest") {
      if (!checkDuplicates(concreteOptions, array[i])) {
        concreteOptions.push(array[i]);
      } else {
        i--;
      }
    } else if (array[i].name == "potion") {
      let potion = pickN(state.rarifyArray(state.potionPool), 1, {
        duplicatesAllowed: false,
      });
      if (!checkDuplicates(concreteOptions, potion)) {
        concreteOptions.push(potion);
      } else {
        i--;
      }
    } else {
      throw "unknown generic option type: " + array[i].name;
    }
  }
  return concreteOptions;
}
