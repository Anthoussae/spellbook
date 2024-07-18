import { startCombat } from "./combat";

test('startCombat should set the combat state to true', () => {
    const state = {
        currentScreen: "path",
        level: 1,
        hp: 10,
    }
    
    startCombat(state);

    expect(state).toEqual({
        currentScreen: "combat",
        level: 2,
        hp: 5,
        currentEnemy: 5,
    });
})