export function pickN(
    array,
    count
) {
    // Make a copy of the array so we don't modify the original
    array = [ ... array ];

    const result = [];

    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * array.length);
        result.push(array.splice(index, 1)[0]);
    }

    return result;
}