"use strict";

import { generateThreeRandomIntegersAddingUpToX } from "../../util/generateThreeRandomIntegersAddingUpToX";

export function generateStarterDeck(oldState) {
  let state = { ...oldState };
  let deck = [];
  let weights = generateThreeRandomIntegersAddingUpToX(4);
  const cardPool = state.cardPool.filter(
    (card) => card.level === 0 && card.characterClass === "none"
  );
  cardPool.forEach((card, index) => {
    deck.push(card);
    deck.push(card);
    for (let i = 0; i < weights[index]; i++) {
      deck.push(card);
    }
  });
  state.deck = deck;
  state = insertClassCards(state);

  return state;
}

function insertClassCards(oldState) {
  let state = { ...oldState };
  // inserts two class cards into your deck.
  return state;
}
