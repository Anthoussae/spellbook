import { render } from "../render/render.js";
import { newGame } from "../main.js";

// this function is a placeholder. Real combat mechanics need to be properly designed.
export function startCombat(state) {
  state = { ...state };
  state.currentScreen = "combat";
  state.enemyHp = state.currentEnemy.maxHp;
  state.hp = state.hp - state.currentEnemy.hp;
  if (state.hp <= 0) {
    alert("You Lose!");
    newGame();
  }
  render(state);
}
