//a test to ensure that repeatAction is working correctly.

import { repeatAction } from "../repeatAction";

test("repeatAction should repeat the action the correct number of times", () => {
  const action = jest.fn();
  const n = 3;
  repeatAction(n, action);
  expect(action).toHaveBeenCalledTimes(n);
});

test("repeatAction should not repeat the action if n is 0", () => {
  const action = jest.fn();
  const n = 0;
  repeatAction(n, action);
  expect(action).toHaveBeenCalledTimes(0);
});
