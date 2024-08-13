"use strict";
// applies gem effects.
//consolidate with card effects

export function insertGem(card, gem) {
  let newCard = { ...card };
  console.log(card, gem);
  newCard.name = gem.name + " " + newCard.name;
  newCard.color = gem.color;
  newCard.effect = newCard.effect + ". " + gem.effect;
  if (gem.bunnyAdd) {
    newCard.bunnyAdd = (newCard.bunnyAdd || 0) + gem.bunnyAdd;
  }
  if (gem.drawOnDraw) {
    newCard.drawOnDraw = (newCard.drawOnDraw || 0) + gem.drawOnDraw;
  }
  if (gem.ink) {
    newCard.ink = Math.max(newCard.ink + gem.ink, 0);
  }
  if (gem.bunnyMult) {
    newCard.bunnyMult = (newCard.bunnyMult || 0) + gem.bunnyMult;
  }
  if (gem.bunniesOnDraw) {
    newCard.bunniesOnDraw = (newCard.bunniesOnDraw || 0) + gem.bunniesOnDraw;
  }
  if (gem.inkAdd) {
    newCard.inkAdd = (newCard.inkAdd || 0) + gem.inkAdd;
  }
  if (gem.reduceEnemyMaxHpPercent) {
    newCard.reduceEnemyMaxHpPercent =
      (newCard.reduceEnemyMaxHpPercent || 0) + gem.reduceEnemyMaxHpPercent;
  }
  if (gem.retriggers && newCard.retriggers) {
    newCard.retriggers = (newCard.retriggers || 0) + gem.retriggers;
  }
  if (gem.retriggers && !newCard.retriggers) {
    newCard.retriggers = gem.retriggers;
    newCard.retriggerScope = "self";
  }
  if (gem.pageAdd) {
    newCard.pageAdd = (newCard.pageAdd || 0) + gem.pageAdd;
  }
  console.log(newCard);
  return newCard;
}
