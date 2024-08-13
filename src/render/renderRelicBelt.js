"use strict";

export function renderRelicBelt(state) {
  let html = "";
  for (let relic of state.relicBelt) {
    html += `
      <div class="relic-item">
        ${relic.name}
        <span class="tooltip">${relic.effect}</span>
      </div>
    `;
  }
  document.querySelector("#relicBelt").innerHTML = html;
}
