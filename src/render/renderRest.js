"use strict";
import { startPathSelection } from "../state/startPathSelection";
import { renderHud } from "./renderHud";
import { renderRelicBelt } from "./renderRelicBelt";

//placeholder functions for resting
export function renderRest(state) {
  displayRest(() => {
    renderRelicBelt(state);
    renderHud(state);
    startPathSelection(state);
  });
}
export function displayRest(callback) {
  let countdown = 1;
  //update HTML immediately to show initial countdown
  let html = "";
  html +=
    "<div style='border: 3px solid lightgreen; color: darkgreen; background-color: lightgreen; font-size: 50px; text-align: center; padding: 20px;'>";
  html += `Resting...`;
  html += "</div>";
  document.querySelector("#output").innerHTML = html;
  // Start the interval for subsequent updates
  let countdownInterval = setInterval(() => {
    countdown--;
    if (countdown >= 0) {
      html = "";
      html +=
        "<div style='border: 3px solid lightgreen; color: darkgreen; background-color: lightgreen; font-size: 50px; text-align: center; padding: 20px;'>";
      html += `Rest ${countdown}`;
      html += "</div>";
      document.querySelector("#output").innerHTML = html;
    }
    if (countdown < 0.1) {
      clearInterval(countdownInterval);
      document.querySelector("#output").innerHTML =
        "<div style='border: 3px solid lightgreen; color: darkgreen; background-color: lightgreen; font-size: 50px; text-align: center; padding: 20px;'>Rest!</div>";
      if (callback) callback();
    }
  }, 1000);
}
