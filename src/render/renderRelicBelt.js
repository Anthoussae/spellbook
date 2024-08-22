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


 
/*
image tag 
<img class='relic' id="${relic.name}" src="./data/imgs/inkpot.png"></img>
document.getElementById(relic.name).addEventListener("click", () => {
  //my function
  }

  check css tint 
  filter: blur(5px);
filter: brightness(0.4);
filter: contrast(200%);
filter: drop-shadow(16px 16px 20px blue);
filter: grayscale(50%);
filter: hue-rotate(90deg);
filter: invert(75%);
filter: opacity(25%);
filter: saturate(30%);
filter: sepia(60%);

canvas 

scalable vector graphics

//how do i create an svg that is a circle with a border and a fill color?
<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="${myColor}" />


*/


