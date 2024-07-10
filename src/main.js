'use strict';

const state = {
  maxHp: 100,
  deck: [],
  hand: [],
  graveyard: [],
  relicBelt:[],
  relicPool: [],
  cardPool: [],
  hp: 100,
  gold: 0,
  level: 0,
  currentScreen: "path",
  presentedPathOptions: [],
  presentedRewardOptions: [],
  currentEnemy: null,
  restHealAmount: 25,
}

let pathOptions = [
  {
    name: "Three Carrots",
    level: 0,
    hp: 3,
    goldReward: 3,
    screen: "combat"
  }, {
    name: "Four Carrots",
    level: 0,
    hp: 4,
    goldReward: 4,
    screen: "combat"
  }, {
    name: "Five Carrots",
    level: 0,
    hp: 5,
    goldReward: 5,
    screen: "combat"
  }, {
    name: "Six Carrots",
    level: 0,
    hp: 6,
    goldReward: 6,
    screen: "combat"
  }, {
    name: "Rest",
    level: 0,
    screen: "rest",
  }
];

let rewardOptions = [{
    name: "Extra ten gold",
    level: 1,
    goldReward: 10,
    type: "instant",
  }, {
    name: "Heal ten HP",
    level: 1,
    hpHeal: 10,
    type: "instant"
  }, {
    name: "Small relic",
    level: 1,
    type: "relic"
  }, {
    name: "card",
    level: 1,
    type: "card"
  }, {
    name: "Card removal",
    level: 1,
    type: "deck service"
  }, {
    name: "Card upgrade",
    level: 1,
    type: "deck service"
  }
]


function path(){
  state.currentScreen = "path";
  const appropriatePathOptions = pathOptions.filter(pathOption => pathOption.level == state.level);
  const presentedPathOptions = [];
  for (let i = 0; i < 3; i++){
    const presentedPathOptionIndex = Math.floor(appropriatePathOptions.length*(Math.random()));
    presentedPathOptions.push(appropriatePathOptions[presentedPathOptionIndex]);
    appropriatePathOptions.splice(presentedPathOptionIndex, 1)
  }
  state.presentedPathOptions = presentedPathOptions;
  render(state);
}


function rest(){
  state.currentScreen = "rest";
  state.hp = Math.min(state.hp + state.restHealAmount, state.maxHp);
  state.level = state.level +1;
  render(state);
}

function combat(){
  state.currentScreen = "combat";
  state.level = state.level +1;
  state.hp = state.hp -1;
  render(state);
}


function reward(){
  state.currentScreen = 'reward';
  const appropriateRewardOptions = rewardOptions.filter(rewardOption => rewardOption.level == state.level);
  const presentedRewardOptions = [];
  for (let i = 0; i < 3; i++){
    const presentedRewardOptionIndex = Math.floor(appropriateRewardOptions.length*(Math.random()));
    presentedRewardOptions.push(appropriateRewardOptions[presentedRewardOptionIndex]);
    appropriateRewardOptions.splice(presentedRewardOptionIndex, 1)
  }
  state.presentedRewardOptions = presentedRewardOptions;
  render(state);
}

function applyReward(option){
  if (option.type == "instant"){
    state.hp = Math.min(state.hp + (option.hpHeal || 0), state.maxHp);
    state.gold = state.gold + (option.goldReward || 0);
  }
  else if (option.type == 'relic'){
    // move the selected option from the relic pool to the relic belt.
  }
  else if (option.type == 'card'){
    // add a copy of the selected option to your deck
  }
  else if (option.type == 'deck service'){
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
          combat()
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
    const options = state.presentedRewardOptions;
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
  html += 'HP: ' + state.hp + "/" + state.maxHp + ", ";
  html += 'Gold: ' + state.gold + ", ";
  html += 'Level ' + state.level + ", ";
  // in final version add functionality so you can inspect deck by clicking on deck in hud
  html += 'Deck ' + state.deck.length;
  document.querySelector('#hud').innerHTML = html;
}

function renderRelicBelt(){
  
}

path()