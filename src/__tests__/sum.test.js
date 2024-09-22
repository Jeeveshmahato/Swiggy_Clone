import { sum } from "../Components/sum";

test("summ of two numbers", () => {
  const result = sum(5, 2);

  // Assertion - excepting result
  expect(result).toBe(7);
});
