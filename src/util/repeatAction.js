"use strict";
export function repeatAction(times, action) {
  //repeats a function a certain number of times
  for (let i = 0; i < times; i++) {
    action();
  }
}
