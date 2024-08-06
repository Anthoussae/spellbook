"use strict";
import { render } from "../render/render";

export function startShop(oldState) {
  let state = { ...oldState };
  state.currentScreen = "shop";
  state.gold = state.gold - 10;
  render(state);
}
