// "use strict";

// export function colorWitch(state) {
//   let R = state.color.R;
//   let G = state.color.G;
//   let B = state.color.B;
//   let color = "rgb(" + R + "," + G + "," + B + ")";
//   let canvas = document.getElementById("witchCanvas");

//   // Get the 2D drawing context from the canvas
//   let ctx = canvas.getContext("2d");

//   const img = new Image();
//   img.src = "../images/witch.png";

//   img.onload = () => {
//     // Draw the image onto the canvas
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//     // Get image data
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;

//     // Convert white to transparent
//     for (let i = 0; i < data.length; i += 4) {
//       if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
//         data[i + 3] = 0; // Set alpha to 0 (transparent)
//       }
//     }

//     // Put the modified image data back onto the canvas
//     ctx.putImageData(imageData, 0, 0);

//     // Change the composite operation to source-atop
//     ctx.globalCompositeOperation = "source-atop";

//     // Fill the canvas with the desired color
//     ctx.fillStyle = color;
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Reset the composite operation to default
//     ctx.globalCompositeOperation = "source-over";
//   };
// }
