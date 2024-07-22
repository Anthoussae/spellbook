"use strict";
//a function that takes an array and a key:value pair as arguments and returns the first object in the array with that exact key:value pair.

export function findObjectInArray(array, key, value) {
  return array.find((element) => element[key] === value);
}
