"use strict";
// applies gem effects.
export function insertGem(card, gem) {
  let newCard = { ...card };
  newCard.name = gem.name + " " + newCard.name;
  newCard.color = (newCard.color || 0) + gem.color;
  if (gem.bunnyAdd) {
    newCard.bunnyAdd = (newCard.bunnyAdd || 0) + gem.bunnyAdd;
  }
  if (gem.cardsDrawn) {
    newCard.cardsDrawn = (newCard.cardsDrawn || 0) + gem.cardsDrawn;
  }
  if (gem.ink) {
    newCard.ink = Math.max(newCard.ink + gem.ink, 0);
  }
  if (gem.bunnyMult) {
    newCard.bunnyMult = (newCard.bunnyMult || 0) + gem.bunnyMult;
  }
  if (gem.bunniesOnDraw) {
    newCard.bunniesOnDraw = (newCard.bunniesOnDraw || 0) + gem.bunniesOnDraw;
    newCard.trigger = (newCard.trigger || "") + "draw";
  }
  if (gem.inkAdd) {
    newCard.inkAdd = (newCard.inkAdd || 0) + gem.inkAdd;
  }
  if (gem.reduceEnemyMaxHpPercent) {
    newCard.reduceEnemyMaxHpPercent = Math.min(
      (newCard.reduceEnemyMaxHpPercent || 0) + gem.reduceEnemyMaxHpPercent,
      90
    );
  }
  if (gem.retriggers && newCard.retriggers) {
    newCard.retriggers = (newCard.retriggers || 0) + gem.retriggers;
  }
  if (gem.retriggers && !newCard.retriggers) {
    newCard.retriggers = newCard.retriggers || "self";
  }
  if (gem.pageAdd) {
    newCard.pageAdd = (newCard.pageAdd || 0) + gem.pageAdd;
  }
  return newCard;
}
