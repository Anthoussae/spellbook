"use strict";
import { render } from "../render/render";
import { insertRelic } from "./insertRelic";

//start shop ends with a render call.
//make sure that's acceptable! It may need to return state instead.

export function startShop(oldState) {
  let state = { ...oldState };
  checkStartShopTriggers(state);
  state.currentScreen = "shop";

  let offeredPotions = [];
  let offeredRelics = [];
  let offeredCards = [];
  let offeredGems = [];

  //offered Relic array
  let basicRelics = [
    {
      //integrated
      name: "Inkpot",
      effect: "inkOnStart",
      rarity: "common",
      inkAdd: 1,
      type: "relic",
      trigger: "combatStart",
    },
    {
      //integrated - not working
      name: "Quill",
      bonusHandsize: 1,
      effect: "+openingHandsize",
      rarity: "common",
      type: "relic",
      trigger: "combatStart",
    },
    {
      //integrated
      name: "Extra Page",
      bonusPages: 1,
      effect: "+1 page",
      rarity: "uncommon",
      type: "relic",
      trigger: "combatStart",
    },
  ];
  let offeredRelic1 =
    basicRelics[Math.floor(Math.random() * basicRelics.length)];
  offeredRelics.push(offeredRelic1);
  let offeredRelic2 = getRandomNonMatchingObject(
    state.relicPool,
    {
      rarity: "basic",
    },
    { name: offeredRelic1.name }
  );
  offeredRelics.push(offeredRelic2);
  let offeredRelic3 = getRandomNonMatchingObject(
    state.relicPool,
    {
      rarity: "basic",
    },
    { name: offeredRelic2.name }
  );
  offeredRelics.push(offeredRelic3);

  //potion array
  let offeredPotion1 = getRandomMatchingObject(state.potionPool);
  offeredPotions.push(offeredPotion1);
  let offeredPotion2 = getRandomNonMatchingObject(state.potionPool, {
    name: offeredPotion1.name,
  });
  offeredPotions.push(offeredPotion2);
  let offeredPotion3 = getRandomNonMatchingObject(
    state.potionPool,
    { name: offeredPotion1.name },
    { name: offeredPotion2.name }
  );
  offeredPotions.push(offeredPotion3);

  //card array
  let offeredCard1 = getRandomNonMatchingObject(
    state.cardPool,
    { level: 0 },
    { level: -1 }
  );
  offeredCards.push(offeredCard1);
  let offeredCard2 = getRandomNonMatchingObject(
    state.cardPool,
    { level: 0 },
    { level: -1 },
    { name: offeredCard1.name }
  );
  offeredCards.push(offeredCard2);
  let offeredCard3 = getRandomNonMatchingObject(
    state.cardPool,
    { level: 0 },
    { level: -1 },
    { name: offeredCard1.name },
    { name: offeredCard2.name }
  );
  offeredCards.push(offeredCard3);

  //gem array
  let offeredGem1 = getRandomMatchingObject(state.gemPool);
  offeredGems.push(offeredGem1);
  let offeredGem2 = getRandomNonMatchingObject(state.gemPool, {
    name: offeredGem1.name,
  });
  offeredGems.push(offeredGem2);
  let offeredGem3 = getRandomNonMatchingObject(
    state.gemPool,
    { name: offeredGem1.name },
    { name: offeredGem2.name }
  );
  offeredGems.push(offeredGem3);

  let shopWares = [offeredPotions, offeredRelics, offeredCards, offeredGems];
  // let pricedWares = assignPrices(shopWares, state);

  // state.shopWares = pricedWares;
  state.shopWares = assignPrices(shopWares, state);
  render(state);
}

function assignPrices(shopWares, oldState) {
  let state = { ...oldState };
  let oldWares = shopWares;
  let pricedWares = [];
  const priceRanges = {
    relic: {
      common: { min: 8, max: 12 },
      uncommon: { min: 20, max: 40 },
      rare: { min: 50, max: 75 },
      mythic: { min: 100, max: 200 },
    },
    potion: {
      common: { min: 4, max: 10 },
      uncommon: { min: 11, max: 20 },
      rare: { min: 21, max: 30 },
      mythic: { min: 31, max: 50 },
    },
    card: {
      common: { min: 6, max: 10 },
      uncommon: { min: 11, max: 20 },
      rare: { min: 21, max: 30 },
      mythic: { min: 31, max: 50 },
    },
    gem: {
      common: { min: 20, max: 30 },
      uncommon: { min: 31, max: 50 },
      rare: { min: 51, max: 70 },
      mythic: { min: 71, max: 100 },
    },
  };

  // Adjusted loop to calculate prices based on the defined ranges
  for (let i = 0; i < oldWares.length; i++) {
    let wareType = oldWares[i];
    for (let j = 0; j < wareType.length; j++) {
      let ware = wareType[j];
      let { min, max } = priceRanges[ware.type][ware.rarity];
      let basePrice = getRandomPrice(min, max);

      ware.price = ware.price = basePrice * (1 - state.discount);
    }
  }

  pricedWares = oldWares;
  return pricedWares;
}

//Function to generate a random price within a range
function getRandomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomNonMatchingObject(
  arr,
  filter1 = {},
  filter2 = {},
  filter3 = {},
  filter4 = {}
) {
  // Combine the filters into an array for easier processing
  const filters = [filter1, filter2, filter3, filter4];

  // Filter the array to include only objects that do not match any of the filters
  const filteredArray = arr.filter((obj) => {
    return filters.every((filter) => {
      // Check if filter is empty, if so, ignore it
      if (Object.keys(filter).length === 0) return true;
      // Otherwise, check for any match
      return !Object.entries(filter).some(([key, value]) => obj[key] === value);
    });
  });

  // If the filtered array is empty, return null or undefined
  if (filteredArray.length === 0) return null;

  // Return a random object from the filtered array
  const randomIndex = Math.floor(Math.random() * filteredArray.length);
  return filteredArray[randomIndex];
}

function getRandomMatchingObject(arr, key, value) {
  // Filter the array to include only objects that have an exact match for the key-value pair
  const matchingObjects = arr.filter((obj) => obj[key] === value);

  // If no matching objects are found, return null or undefined
  if (matchingObjects.length === 0) return null;

  // Return a random object from the filtered array
  const randomIndex = Math.floor(Math.random() * matchingObjects.length);
  return matchingObjects[randomIndex];
}

function checkStartShopTriggers(state) {
  console.log("checking start shop triggers");
  // Check for any triggers that should occur when starting the shop
  // For example, removing certain relics or cards from the pool
}
