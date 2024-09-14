"use strict";

export function upgradeCard(oldState, card) {
  let state = { ...oldState };
  let upgradedCard = { ...card };

  // Increase the upgrade level of the card
  if (upgradedCard.upgrade) {
    upgradedCard.upgrade = upgradedCard.upgrade + 1;
  } else {
    upgradedCard.upgrade = 1;
  }

  // applies the upgrade.
  //some cards may not receive any bonus.
  if (upgradedCard.bunnyAdd) {
    upgradedCard.bunnyAdd = upgradedCard.bunnyAdd + 1;
  }
  if (upgradedCard.bunnyMult) {
    upgradedCard.bunnyMult = upgradedCard.bunnyMult + 0.5;
  }
  if (upgradedCard.cardsDrawn) {
    upgradedCard.cardsDrawn = upgradedCard.cardsDrawn + 1;
  }
  if (upgradedCard.retriggers) {
    upgradedCard.retriggers = upgradedCard.retriggers + 1;
  }
  if (upgradedCard.inkAdd) {
    upgradedCard.inkAdd = upgradedCard.inkAdd + 1;
  }
  if (upgradedCard.reduceEnemyMaxHpPercent) {
    upgradedCard.reduceEnemyMaxHpPercent =
      upgradedCard.reduceEnemyMaxHpPercent + 0.1;
  }
  if (upgradedCard.purge) {
    upgradedCard.purge = upgradedCard.purge + 1;
  }
  if (upgradedCard.pageAdd) {
    upgradedCard.pageAdd = upgradedCard.pageAdd + 1;
  }

  // Update the card's name to reflect the upgrade level
  let newCardName =
    upgradedCard.name.replace(/\s\+\d+$/, "") + " +" + upgradedCard.upgrade;
  upgradedCard.name = newCardName;

  // Find the index of the original card in the deck
  let cardIndex = state.deck.findIndex(
    (c) => c.name === card.name && c.upgrade === (card.upgrade || 0)
  );

  checkUpgradeTriggers(state, upgradedCard);
  // If the card is found, replace it with the upgraded card
  if (cardIndex !== -1) {
    state.deck.splice(cardIndex, 1, upgradedCard);
  } else {
    // If the card is not found, push the upgraded card to the deck
    state.deck.push(upgradedCard);
  }

  return state;
}

export function randomlyUpgradeXCards(oldState, X) {
  let state = { ...oldState };

  // Shuffle the deck to ensure randomness
  let shuffledDeck = state.deck.sort(() => Math.random() - 0.5);

  // Select the first X cards from the shuffled deck
  let cardsToUpgrade = shuffledDeck.slice(0, X);

  // Upgrade each selected card
  cardsToUpgrade.forEach((card) => {
    state = upgradeCard(state, card);
  });

  return state;
}

export function checkUpgradeTriggers(state, card) {
  console.log(state, card);
}
