'use strict';

import { startCombat } from "./state/combat";
import { pickN } from "./util/pick";

//to do: Incorporate a Combat Hud, including hand, board, target carrots, current bunnies, and ink.

//state is fully assigned in the reset function.
const state = {
}

// an array with all the cards. Ultimately move to a separate objects folder.
// current keywords: addBunnies(bunnyAdd), draw(cardsDrawn), multiplyBunnies(bunnyMult)
let cardPool = [
  // level 0 (starter deck)
  {
    name: "Bunnymancy",
    level: 0,
    bunnyAdd: 2,
    ink: 1,
    effect: "addBunnies",
    rarity: "common",
    type: "card",
  },{
    name: "Ponder",
    level: 0,
    ink: 1,
    cardsDrawn: 2,
    type: "instant",
    effect: "draw",
    rarity: "common",
    type: "card",
  },{
    name: "Bunnyplication",
    level: 0,
    ink: 3,
    bunnyMult: 2,
    effect: "multiplyBunnies",
    rarity: "common",
    type: "card",
  },
  // level 1 
  {
    name: "Bounding Bunnies",
    level: 1,
    bunnyAdd: 2,
    ink: 0,
    effect: "addBunnies",
    rarity: "common",
    type: "card",
  }, {
    name: "Bunny Love",
    level: 1,
    ink: 4,
    bunnyMult: 3,
    effect: "multiplyBunnies",
    rarity: "uncommon",
    type: "card",
  }
];

// an array with all the relics (referred to as "items" ingame. Ultimately move to a separate objects folder)
let relicPool = [];

// potions are one use items that instantly apply a modification.
let potionPool = [{
  name: "Firefly Potion",
  level: 1,
  goldReward: 10,
  type: "potion",
  rarity: "common",
},{
  name: "Lesser Healing Potion",
  level: 1,
  hpHeal: 10,
  type: "potion",
  rarity: "common",
},{
  name: "Leech Potion",
  level: 1,
  type: "potion",
  goldReward: 20,
  hpHeal: -10,
  rarity: "rare",
},{
  name: "Greater Healing Potion",
  level: 1,
  type: "instant",
  goldReward: -10,
  hpHeal: 20,
  rarity: "uncommon",
},{

}];

//gems are items that when selected open up the deck service screen, and allow you to apply a gem to a card.
let gemPool = [{
  name: "Onyx",
  level: 1,
  type: "gem",
  rarity: "common",
  restrictions: "none",
  effect: "destroy"
}, {
  name: "Lapis Lazuli",
  level: 1,
  type: "gem",
  rarity: "common",
  restrictions: "unsocketed",
  bunnies: 2,
  effect: "+bunnies"
},]

// an array with all path options offered during path selection. These are "combats" and "rest".
let pathOptions = [
  //level 0/16
  {
    name: "Three Carrots",
    level: 0,
    hp: 3,
    goldReward: 3,
    screen: "combat",
    rarity: "common",
  }, {
    name: "Four Carrots",
    level: 0,
    hp: 4,
    goldReward: 4,
    screen: "combat",
    rarity: "common",
  }, {
    name: "Five Carrots",
    level: 0,
    hp: 5,
    goldReward: 5,
    screen: "combat",
    rarity: "common",
  }, {
    name: "Six Carrots",
    level: 0,
    hp: 6,
    goldReward: 6,
    screen: "combat",
    rarity: "uncommon",
  }, {
    name: "Rest",
    level: 0,
    screen: "rest",
    rarity: "rare",
  },
  //level 1/16
    {
    name: "Rest",
    level: 1,
    screen: "rest",
    rarity: "rare",
    }, {
    name: "Six Carrots",
    level: 1,
    hp: 6,
    goldReward: 6,
    screen: "combat",
    rarity: "common",
  }, {
    name: "Seven Carrots",
    level: 1,
    hp: 7,
    goldReward: 7,
    screen: "combat",
    rarity: "common",
  }, {
    name: "Eight Carrots",
    level: 1,
    hp: 8,
    goldReward: 8,
    screen: "combat",
    rarity: "common",
  }, {
    name: "Nine Carrots",
    level: 1,
    hp: 9,
    goldReward: 9,
    screen: "combat",
    rarity: "uncommon",
  }, {
    name: "Ten Carrots",
    level: 1,
    hp: 10,
    goldReward: 10,
    screen: "combat",
    rarity: "rare",
  }
];

// an array with all reward options offered after combat.

let rewardOptions = [{
    name: "Relic",
    level: 1,
    type: "relicReward",
    rarity: "rare",
  }, {
    name: "Card",
    level: 1,
    type: "cardReward",
    rarity: "common",
  }, {
    name: "Potion",
    level: 1,
    type: "potionReward",
    rarity: "common"
  }, {
    name: "Gem",
    level: 1,
    type: "gemReward",
    rarity: "uncommon"
  }
]


// update using new functions
function path(){
  state.currentScreen = "path";
  const possiblePathOptions = rarifyArray(filterArrayByLevel(pathOptions, state.level, state.level));
  state.presentedPathOptions = pickN(possiblePathOptions, 3);
  render(state);
}


function rest(){
  state.currentScreen = "rest";
  state.hp = Math.min(state.hp + state.restHealAmount, state.maxHp);
  state.level = state.level +1;
  render(state);
}

//outputs a new array of objects without any objects with lower level than levelMin nor objects with level higher than levelMax.
function filterArrayByLevel(array, levelMin, levelMax){
  return array.filter(e => e.level >= levelMin && e.level <= levelMax);
}

//outputs a new array of objects with contents balanced by input array object rarity.
function rarifyArray(array){
  const rarifiedArray = [];
  for (let i = 0; i < array.length; i++){
    if (array[i].rarity == "common"){
      for (let j = 0; j < 4; j++){
        rarifiedArray.push(array[i]);
      }
    }
    else if (array[i].rarity == "uncommon"){
      for (let j = 0; j < 3; j++){
        rarifiedArray.push(array[i]);
      }
    }
    else if (array[i].rarity == "rare"){
      for (let j = 0; j < 2; j++){
        rarifiedArray.push(array[i]);
      }
    }
    else if (array[i].rarity == "mythic"){
      for (let j = 0; j < 1; j++){
        rarifiedArray.push(array[i]);
      }
    }
    else {
      throw  "unknown rarity: " + array[i].rarity;
    }
  }
  return rarifiedArray;
}

function makeReplacements(reward){

  if(reward.type == "cardReward"){
    const possibleCardsArray = rarifyArray(filterArrayByLevel(cardPool, state.rewardLuck, state.level));
    const selectedCardIndex = Math.floor(possibleCardsArray.length*(Math.random()));
    const card = (possibleCardsArray[selectedCardIndex]);
    return card;  }
  else if (reward.type == 'potionReward'){
    const possiblePotionsArray = rarifyArray(filterArrayByLevel(potionPool, state.rewardLuck, state.level));
    const selectedPotionIndex = Math.floor(possiblePotionsArray.length*(Math.random()));
    const potion = (possiblePotionsArray[selectedPotionIndex]);
    return potion;
  }
  else if (reward.type == 'gemReward'){
    const possibleGemsArray = rarifyArray(filterArrayByLevel(gemPool, state.rewardLuck, state.level));
    const selectedGemIndex = Math.floor(possibleGemsArray.length*(Math.random()));
    const gem = (possibleGemsArray[selectedGemIndex]);
    return gem;
  }
  else if (reward.type == 'relicReward'){
    const possibleRelicsArray = rarifyArray(filterArrayByLevel(relicPool, state.rewardLuck, state.level));
    const selectedRelicIndex = Math.floor(possibleRelicsArray.length*(Math.random()));
    const relic = (possibleRelicsArray[selectedRelicIndex]);
    return relic;
  }
  else {
    throw   "unknown reward type: " + reward.type;
  }
}

//outputs an array with three randomly selected items from the input array, without duplicates.
function  presentThree(array){
  console.log(array);
    const presentedOptions = [];
    while(presentedOptions.length < 3){
      const presentedOptionIndex = Math.floor(array.length*(Math.random()));
      if (!(checkForRepeats(presentedOptions,array[presentedOptionIndex]))){
        if (state.currentScreen == 'path'){
         presentedOptions.push(array[presentedOptionIndex]);
          }
        else if (state.currentScreen == 'reward'){
          presentedOptions.push(makeReplacements(array[presentedOptionIndex]));
        }
        else {
          throw "unknown screen: " + state.currentScreen;
        }
    }
  }
  return presentedOptions;
}

function reward(){
  state.currentScreen = 'reward';
  const possibleRewardOptions = rarifyArray(filterArrayByLevel(rewardOptions, state.rewardLuck, state.level));
  state.presentedRewardOptions = pickN(possibleRewardOptions, 3);
  render(state);
}

function applyReward(option){
  if (option.type == "potion"){
    state.hp = Math.min(state.hp + (option.hpHeal || 0), state.maxHp);
    state.gold = state.gold + (option.goldReward || 0);
  }
  else if (option.type == 'relic'){
    // move the selected option from the relic pool to the relic belt.
  }
  else if (option.type == 'card'){
    // add a copy of the selected option to your deck
  }
  else if (option.type == 'gem'){
    // launches the subscreen where you can peruse your deck and select 1 card for an effect (removal or upgrade)
  }
  else {
    throw "unknown reward type" + option.type 
  }
}

function render(state){
  renderHud();
  if (state.currentScreen == "path"){
    const options = state.presentedPathOptions;
    let html = ''
    for (const optionIndex in options) {
      const option = options[optionIndex];
      html += '<button data-index="'+optionIndex+'">'
      html +=   option.name
      html += '</button>'
    }
    const outputDiv = document.querySelector('#output')
    outputDiv.innerHTML = html

    const btnElems = document.querySelectorAll('#output button')
    for (let btnElem of btnElems) {
      btnElem.addEventListener('click', () => {
        const name = btnElem.innerHTML
        alert('You clicked ' + name)
        const option = options[btnElem.dataset.index]
        state.currentScreen = option.screen;
        if (state.currentScreen == 'combat'){
          state.currentEnemy = option;
          startCombat(state);
        }
        else if (state.currentScreen == 'rest'){
          rest();
        } else {
          throw "Unknown screen: " + state.currentScreen;
        }
      })
    }
  }
  else if (state.currentScreen == "rest"){
    //play animation for 3 seconds - ideally, fade to black, little fireplace crackling, big green +# hp heal visual, and the HP # ticks up visibly, then fade back to path select.
    let html = 'REST ' + state.hp;
    const outputDiv = document.querySelector('#output')
    outputDiv.innerHTML = html
    setTimeout(() => {
      path();
    }, 3000);
  }
  else if (state.currentScreen == "combat"){
    reward();
  }
  else if (state.currentScreen == 'reward'){
    // const options = state.presentedRewardOptions;
    // let html = ''
    // for (const optionIndex in options) {
    //   const option = options[optionIndex];
    //   html += '<button data-index="'+optionIndex+'">'
    //   html +=   option.name
    //   html += '</button>'
    // }
    // const outputDiv = document.querySelector('#output')
    // outputDiv.innerHTML = html
    document.querySelector('#output').innerHTML = state
      .presentedRewardOptions
      .map((option, optionIndex) => '<button data-index="'+optionIndex+'">'+option.name+'</button>')
      .join('')

    const btnElems = document.querySelectorAll('#output button')
    for (let btnElem of btnElems) {
      btnElem.addEventListener('click', () => {
        const name = btnElem.innerHTML
        alert('You clicked ' + name)
        const option = options[btnElem.dataset.index];
        //reward effect
        applyReward(option);
        renderHud();
        renderRelicBelt();
        path();
      })
    }
  }
  else {
    throw "unknown screen" + state.currentScreen;
  }
}

function renderHud(){
  let html = '';
  html += 'HP: ' + state.hp + "/" + state.maxHp + " ";
  html += 'Gold: ' + state.gold + " ";
  html += 'Level: ' + state.level + " ";
  // in final version add functionality so you can inspect deck by clicking on deck in hud
  html += 'Deck: ' + state.deck.length;
  document.querySelector('#hud').innerHTML = html;
}

function renderRelicBelt(){
  
}

function renderBattlefield(){

}

function reset(){
  Object.assign(state,{
    maxHp: 100,
    deck: [],
    hand: [],
    graveyard: [],
    relicBelt:[],
    relicPool: relicPool,
    cardPool: cardPool,
    hp: 100,
    gold: 0,
    level: 0,
    rewardLuck: 0,
    currentScreen: "path",
    presentedPathOptions: [],
    presentedRewardOptions: [],
    currentEnemy: null,
    restHealAmount: 25,
  });
}



reset();
path();
