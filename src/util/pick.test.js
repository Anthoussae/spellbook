import { pickN } from "./pick";

test('pickN should work when n is the same as the length of the array', () => {
    const array = [1, 2, 3, 4, 5];
    const result = pickN(array, array.length);
    
    for (const item of array) {
        expect(result).toContain(item);
    }
})

test('pickN should not modify the original array', () => {
    const array = [1, 2, 3, 4, 5];
    const copy = [...array];
    pickN(array, 3);
    expect(array).toEqual(copy);
})