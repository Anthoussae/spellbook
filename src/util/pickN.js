"use strict";
export function pickN(oldArray, count, { duplicatesAllowed = false } = {}) {
  let array = [...oldArray];
  const result = [];

  if (duplicatesAllowed) {
    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * array.length);
      result.push(array[index]);
    }
    return result;
  } else if (!duplicatesAllowed) {
    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * array.length);
      const item = array[index];
      if (!result.includes(item)) {
        result.push(item);
      } else {
        i--;
      }
    }
    return result;
  }
}
