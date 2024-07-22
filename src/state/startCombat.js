export function startCombat(state) {
  state = { ...state };
  state.currentScreen = "combat";
  state.level = state.level + 1;
  state.enemyHp = state.currentEnemy.maxHp;
  render(state);
}
