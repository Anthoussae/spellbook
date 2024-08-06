"use strict";
export function generateThreeRandomIntegersAddingUpToX(x) {
  let a = Math.floor(Math.random() * x);
  let b = Math.floor(Math.random() * (x - a));
  let c = x - a - b;
  return [a, b, c];
}
