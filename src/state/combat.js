export function startCombat(state){
    state.currentScreen = "combat";
    state.level = state.level + 1;
    state.hp = state.hp - state.currentEnemy.hp;
}