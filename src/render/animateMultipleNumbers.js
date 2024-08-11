"use strict";
//currently nonfunctional.

// export function animateMultipleNumbers(elementId, newValues) {
//   const element = document.getElementById(elementId);
//   const content = element.textContent;

//   // Extract all numbers from the content using a regex
//   const numberMatches = content.match(/\d+/g);
//   if (!numberMatches) return; // No numbers found, exit

//   // Ensure newValues array matches the number of extracted numbers
//   const numCount = Math.min(numberMatches.length, newValues.length);

//   // Function to animate a single number change
//   function animateSingleNumber(index, currentValue, newValue) {
//     const difference = newValue - currentValue;
//     const duration = Math.min(Math.abs(difference) * 2, 1000); // Max 1 second
//     const steps = Math.min(Math.abs(difference), 100); // Max 100 steps

//     if (difference !== 0) {
//       const increment = difference / steps;
//       const interval = duration / steps;

//       let currentStep = 0;

//       const tick = setInterval(() => {
//         currentStep++;
//         const updatedValue = Math.round(currentValue + increment * currentStep);

//         // Replace the specific number in the original text
//         const updatedContent = content.replace(
//           new RegExp(`(\\d+)`, "g"),
//           (match, p1, offset, string) => {
//             if (index-- === 0) return updatedValue;
//             return match;
//           }
//         );
//         element.textContent = updatedContent;

//         if (currentStep >= steps) {
//           clearInterval(tick);
//           element.textContent = content.replace(
//             new RegExp(`(\\d+)`, "g"),
//             (match, p1, offset, string) => {
//               if (index-- === 0) return newValue;
//               return match;
//             }
//           );
//         }
//       }, interval);
//     }
//   }

//   // Animate each number found
//   numberMatches.forEach((currentValue, i) => {
//     if (i < numCount) {
//       animateSingleNumber(i, parseInt(currentValue), newValues[i]);
//     }
//   });
// }
