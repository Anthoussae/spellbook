"use strict";

export function renderTitle(state) {
  const red = state.color.R;
  const green = state.color.G;
  const blue = state.color.B;
  const backgroundColor =
    "rgba(" + red + "," + green + "," + blue + "," + "0.7)";
  let title = document.querySelector("#titlecard");
  title.style.backgroundColor = backgroundColor;
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  if (luminance < 0.5) {
    title.style.color = "white";
  } else {
    title.style.color = "black";
  }
}
