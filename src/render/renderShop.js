"use strict";
import { startPathSelection } from "../state/startPathSelection";
import { renderHud } from "./renderHud";
import { renderRelicBelt } from "./renderRelicBelt";

// Placeholder functions to simulate shop
//lets completely rewrite it.
export function renderShop(state) {
  console.log(state.shopWares);

  displayShop(() => {
    renderRelicBelt(state); // Render relic belt after animation
    renderHud(state); // Render HUD after relic belt
    startPathSelection(state); // Start path selection after HUD
  });
}
export function displayShop(callback) {
  let countdown = 1;
  // Update HTML immediately to show initial countdown
  let html = "";
  html +=
    "<div style='border: 3px solid yellow; color: darkorange; background-color: lightyellow; font-size: 50px; text-align: center; padding: 20px;'>";
  html += `Shop`;
  html += "</div>";
  document.querySelector("#output").innerHTML = html;
  // Start the interval for subsequent updates
  let countdownInterval = setInterval(() => {
    countdown--;
    if (countdown >= 0) {
      // Update HTML with the current countdown value
      html = "";
      html +=
        "<div style='border: 3px solid yellow; color: darkorange; background-color: lightyellow; font-size: 50px; text-align: center; padding: 20px;'>";
      html += `Shop ${countdown}`;
      html += "</div>";
      document.querySelector("#output").innerHTML = html;
    }
    if (countdown < 0.1) {
      clearInterval(countdownInterval);
      document.querySelector("#output").innerHTML =
        "<div style='border: 3px solid yellow; color: darkorange; background-color: lightyellow; font-size: 50px; text-align: center; padding: 20px;'>Shopped!</div>";
      if (callback) callback(); // Call the callback after the animation ends
    }
  }, 1000);
}
