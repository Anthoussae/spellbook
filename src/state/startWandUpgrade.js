"use strict";
import { findObjectInArray } from "../util/findObjectInArray";
import { transformRelic } from "./transformRelic";
import { render } from "../render/render";

export function startWandUpgrade(oldState) {
  let state = { ...oldState };
  state.currentScreen = "wandUpgrade";
  let oldWand = findObjectInArray(state.relicBelt, "supertype", "wand");
  if (typeof oldWand !== "object") {
    console.log("No wand to upgrade");
    return state;
  }
  let newWand = {
    ...oldWand,
    bunnyAdd: state.wandUpgrade.wandUpgradeAmount + oldWand.bunnyAdd,
  };
  transformRelic(state, oldWand, newWand);
  render(state);
}
