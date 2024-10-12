"use strict";
// import { renderBattlefield } from "../../render/renderBattlefield";
import { castSpell } from "./castSpell";
import { renderCombat } from "../../render/renderCombat";
import { renderCardDraw } from "../../render/renderCardDraw";
import { publishMessage } from "../../util/publishMessage";

export function playCard(oldState, playedCard, cardElement) {
  console.log("playCard", playedCard, oldState);
  let state = { ...oldState };
  let card = playedCard;
  let hand = state.hand;
  let spellbook = state.spellbook;
  let cardDiv = cardElement;

  //ink cost check
  if (card.ink > state.combatInk) {
    console.log("not enough ink!");
    // Apply the red highlight immediately
    cardElement.style.backgroundColor = "red";
    cardElement.style.filter = "drop-shadow(0 0 0.75rem rgb(255, 0, 0))";

    // Remove the red highlight after 2 seconds
    setTimeout(() => {
      cardElement.style.backgroundColor = ""; // Revert to default or original color
      cardElement.style.filter = ""; // Remove the drop-shadow
    }, 2000);
    //message
    // Create a message element
    publishMessage("Not enough ink!");
    // Fade out and remove the message after 2 seconds

    return state;
  } else if (card.ink <= state.combatInk) {
    state.combatInk = state.combatInk - card.ink;
    console.log("ink", state.combatInk);
  }

  //empty page check
  if (
    state.spellbook.every((page) => page != "page") &&
    card.trigger == "cast"
  ) {
    console.log("no space on the spellbook");

    cardElement.style.backgroundColor = "red";
    cardElement.style.filter = "drop-shadow(0 0 0.75rem rgb(255, 0, 0))";

    // Remove the red highlight after 2 seconds
    setTimeout(() => {
      cardElement.style.backgroundColor = ""; // Revert to default or original color
      cardElement.style.filter = ""; // Remove the drop-shadow
    }, 2000);

    publishMessage("Not enough pages!");

    // renderBattlefield(state);
    return state;
  }

  //card type check & page spce caheck
  if (card.trigger == "cast") {
    //if state.spellbook contains any "page", replace the page with the lowest index with the card.
    let page = spellbook.findIndex((page) => page == "page");
    if (page != -1) {
      spellbook[page] = card;
    } else {
      console.log("no space on the spellbook");
    }
    //now remove the chosen card from state.hand.
    let cardIndex = hand.findIndex((card) => card == playedCard);
    hand.splice(cardIndex, 1);
    state.hand = hand;
    state.spellbook = spellbook;
  } else if (card.trigger == "instant") {
    //instant card don't require space on the spellbook, and are instead immediately resolved.
    //  remove the chosen card from state.hand.
    let cardIndex = hand.findIndex((card) => card == playedCard);
    hand.splice(cardIndex, 1);
    state.hand = hand;
    state.spellbook = spellbook;
    //resolve effect
    state = castSpell(state, card);
  }

  //now remove the chosen card from state.hand.
  let cardIndex = hand.findIndex((card) => card == playedCard);
  hand.splice(cardIndex, 1);
  state.hand = hand;
  state.spellbook = spellbook;

  redrawHand(state);
  cardElement.remove();
  renderCombat(state);

  return state;
}

export function clearHand() {
  const handDiv = document.getElementById("combatHand");
  handDiv.innerHTML = ""; // Remove all cards
  //remove all children of the hand div without using while
  if (handDiv.firstChild) {
    while (handDiv.firstChild) {
      handDiv.removeChild(handDiv.firstChild);
    }
  }
}

// Function to redraw all cards in the hand based on the current state
export function redrawHand(state) {
  clearHand(); // Clear the existing hand
  console.log("state.hand", state.hand);
  // Loop through the cards in the current hand
  state.hand.forEach((card) => {
    renderCardDraw(card, state); // Redraw the card with the updated state
  });
  renderCardDraw(state.hand[0], state);
  console.log("state.hand", state.hand);
}
