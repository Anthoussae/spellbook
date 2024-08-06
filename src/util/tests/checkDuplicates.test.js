//a test to confirm that checkDuplicates is working correctly.

import { checkDuplicates } from "../checkDuplicates";

test("checkDuplicates should return true if the object is present in the array", () => {
  const array = [
    { name: "Magic Wand", value: 10 },
    { name: "Broken Wand", value: 5 },
  ];
  const object = { name: "Magic Wand", value: 10 };
  expect(checkDuplicates(array, object)).toBe(true);
});

test("checkDuplicates should return false if the object is not present in the array", () => {
  const array = [
    { name: "Magic Wand", value: 10 },
    { name: "Broken Wand", value: 5 },
  ];
  const object = { name: "Inkpot", value: 5 };
  expect(checkDuplicates(array, object)).toBe(false);
});
