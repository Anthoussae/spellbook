//a test to ensure that pickN is working correctly.

import { pickN } from "../pickN";

test("pickN should return an array of the correct length", () => {
  const pool = [
    { name: "Magic Wand", value: 10 },
    { name: "Broken Wand", value: 5 },
    { name: "Inkpot", value: 5 },
  ];
  const n = 2;
  expect(pickN(pool, n)).toHaveLength(n);
});

test("pickN should return an array of objects", () => {
  const pool = [
    { name: "Magic Wand", value: 10 },
    { name: "Broken Wand", value: 5 },
    { name: "Inkpot", value: 5 },
  ];
  const n = 2;
  expect(pickN(pool, n)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: expect.any(String) }),
    ])
  );
});

test("pickN should return an array of unique objects if duplicates allowed = false", () => {
  const pool = [
    { name: "Magic Wand", value: 10 },
    { name: "Broken Wand", value: 5 },
    { name: "Inkpot", value: 5 },
  ];
  const n = 2;
  expect(pickN(pool, n, { duplicatesAllowed: false })).toHaveLength(n);
});

test("pickN can return duplicates if duplicates allowed = true", () => {
  const pool = [
    { name: "Magic Wand", value: 10 },
    { name: "Broken Wand", value: 5 },
    { name: "Inkpot", value: 5 },
  ];
  const n = 2;
  expect(pickN(pool, n, { duplicatesAllowed: true })).toHaveLength(n);
});
