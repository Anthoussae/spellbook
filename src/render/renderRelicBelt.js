"use strict";

export function renderRelicBelt(state) {
  let html = "";
  for (let relic of state.relicBelt) {
    html += "<div>";
    html += relic.name;
    html += "</div>";
  }
  document.querySelector("#relicBelt").innerHTML = html;
}
