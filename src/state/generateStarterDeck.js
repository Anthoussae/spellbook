"use strict";

import { generateThreeRandomIntegersAddingUpToX } from "../util/generateThreeRandomIntegersAddingUpToX";

export function generateStarterDeck(oldState) {
  let state = { ...oldState };
  let deck = [];
  let weights = generateThreeRandomIntegersAddingUpToX(10);
  const cardPool = state.cardPool.filter(
    (card) => card.level === 0 && card.characterClass === "none"
  );
  cardPool.forEach((card, index) => {
    for (let i = 0; i < weights[index]; i++) {
      deck.push(card);
    }
  });
  state.deck = deck;
  state = insertClassCards(state);
  state = socketRandomCard(state);
  return state;
}

function insertClassCards(oldState) {
  let state = { ...oldState };
  // inserts two class cards into your deck.
  return state;
}

function socketRandomCard(oldState) {
  let state = { ...oldState };
  // sockets a random card based on player color.
  return state;
}
