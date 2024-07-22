//a test to check that the function findObjectInArray returns the correct object.
import { findObjectInArray } from "../findObjectInArray";
test("findObjectInArray should return the correct object", () => {
  const array = [
    { name: "Magic Wand", value: 10 },
    { name: "Broken Wand", value: 5 },
  ];
  const key = "name";
  const value = "Magic Wand";
  expect(findObjectInArray(array, key, value)).toEqual({
    name: "Magic Wand",
    value: 10,
  });
});
