"use strict";
//a function that takes an array and a key:value pair as arguments and returns the first object in the array with that exact key:value pair.
// needs to have a fail case.
export function findObjectInArray(array, key, value) {
  const foundObject = array.find((element) => element[key] === value);
  return foundObject !== undefined ? foundObject : false;
}
