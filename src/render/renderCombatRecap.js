"use strict";
import { renderBattleHud } from "./renderBattleHud";
import { renderRewardSelection } from "./renderRewardSelection";

export function renderCombatRecap(oldState) {
  let state = { ...oldState };
  renderBattleHud(state);
  const outputDiv = document.querySelector("#output");
  let bounty = state.bounty;
  let lastEnemyHp = state.lastEnemyHp;
  let lastBunnies = state.lastBunnies;
  let hpLoss = lastEnemyHp;
  let outcome = state.lastCombatResult;
  let html = "";

  //recap display;
  //it has a next button that proceeds to the reward screen.
  if (outcome == "win") {
    html += `<div class="Wcombat-recap">`;
    html += `<h1 class="Wcombat-recap">You Win!</h1>`;
    html += `<h2 class="Wcombat-recap">You generated ${lastBunnies} bunnies</h2>`;
    html += `<p></p>`;
    html += `<button class="Wcombat-recap-button" id="bounty-reward-button" data-index="3">Bounty: ${bounty} gold</button>`;
    html += `</div>`;
    outputDiv.innerHTML = html;

    // Add a click event listener to the Bounty button
    const bountyButton = document.getElementById("bounty-reward-button");
    bountyButton.addEventListener("click", function () {
      // Increase the gold in the state by the bounty amount
      state.gold = state.gold + bounty;
      // Call renderRewardSelection with the updated state
      renderRewardSelection(state);
    });
  } else if (outcome == "loss" && state.hp > 0) {
    html += `<div class="Lcombat-recap">`;
    html += `<h1 class="Lcombat-recap">You Lost!</h1>`;
    html += `<h2 class="Lcombat-recap">You generated ${lastBunnies} bunnies and lost ${hpLoss} HP!</h2>`;
    html += `<p></p>`;
    html += `<button class="Lcombat-recap-button" id="survivors-reward-button" data-index="3">Next</button>`;
    html += `</div>`;
    outputDiv.innerHTML = html;

    // Add a click event listener to the button
    const rewardButton = document.getElementById("survivors-reward-button");
    rewardButton.addEventListener("click", function () {
      renderRewardSelection(state);
    });
  } else if (outcome == "loss" && state.hp <= 0) {
    renderGameLossScreen(state);
  }
  //remember to reset bounty and outcome.
}

function renderGameLossScreen(state) {
  alert("You lose!");
  console.log(state);
}
