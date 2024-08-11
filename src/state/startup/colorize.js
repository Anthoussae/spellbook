"use strict";
import { applyColorTraits } from "./applyColorTraits";
import { socketCardWithGem } from "../socketCardWithGem";
import { removeCard } from "../removeCard";
import { insertCard } from "../insertCard";
import { insertGem } from "../insertGem";

export function colorize(oldState) {
  let state = { ...oldState };
  state.overallColor = getColorWord(state);
  state = applyColorTraits(state);
  state = socketRandomCard(state);
  return state;
}

// 1.5% of white, 25% black, 12.5% each other color
function getColorWord(state) {
  let R = state.color.R;
  let G = state.color.G;
  let B = state.color.B;
  if (R >= 128 && G <= 127 && B <= 127) {
    return "red";
  } else if (R <= 127 && G >= 128 && B <= 127) {
    return "green";
  } else if (R <= 127 && G <= 127 && B >= 128) {
    return "blue";
  } else if (R >= 128 && G >= 128 && B <= 127) {
    return "yellow";
  } else if (R <= 127 && G >= 128 && B >= 128) {
    return "cyan";
  } else if (R >= 128 && G <= 127 && B >= 128) {
    return "magenta";
  } else if (R >= 192 && G >= 192 && B >= 192) {
    return "white";
  } else {
    return "black";
  }
}

//this is a hideous bugfix, but I can't be bothered to clean it up right now.
function socketRandomCard(oldState) {
  let state = { ...oldState };
  let playerColor = state.overallColor;
  let gem = state.gemPool.filter((gem) => gem.color === playerColor);

  let allGemNames = state.gemPool.map((gem) => gem.name);
  let unsocketedDeck = state.deck
    .filter((card) => {
      return !allGemNames.some((gemName) => card.name.includes(gemName));
    })
    .filter((card) => {
      return !card.trigger.includes("instant");
    });

  if (unsocketedDeck.length > 0) {
    let randomCard =
      unsocketedDeck[Math.floor(Math.random() * unsocketedDeck.length)];
    state.selectedCard = randomCard;
    state.selectedReward = gem[0];
    state = socketCardWithGemSpecial(state);
  }
  return state;
}

//this is a horrible bugfix but i ca't be bothered to sort it out and it works.
export function socketCardWithGemSpecial(oldState) {
  let state = { ...oldState };

  let gem = state.selectedReward;
  let selectedCard = state.selectedCard;
  state = removeCard(state, selectedCard);
  if (gem.name != "Onyx") {
    let socketedCard = insertGem(selectedCard, gem);
    state = insertCard(state, socketedCard);
  }
  state.selectedReward = null;
  document.getElementById("deck").style.visibility = "visible";

  return state;
}
