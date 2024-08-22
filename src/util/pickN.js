"use strict";

export function pickN(oldArray, count, { duplicatesAllowed = false } = {}) {
  if (!Array.isArray(oldArray)) {
    throw new TypeError("The first argument must be an array.");
  }
  if (typeof count !== "number" || count < 1) {
    throw new RangeError("The count must be a positive number.");
  }
  if (!duplicatesAllowed && count > oldArray.length) {
    throw new RangeError(
      "Count cannot be greater than the array length when duplicates are not allowed."
    );
  }

  let array = [...oldArray];

  // Shuffle the array if duplicates are not allowed
  if (!duplicatesAllowed) {
    array = array.sort(() => Math.random() - 0.5);
    return array.slice(0, count);
  } else {
    // For duplicates allowed, pick random elements
    return Array.from({ length: count }, () => {
      const index = Math.floor(Math.random() * array.length);
      return array[index];
    });
  }
}
