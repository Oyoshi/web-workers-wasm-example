import { fib } from "./fib";

describe("fib", () => {
  test("it should properly compute n-th Fibonacci number", () => {
    expect(fib(6)).toEqual(8);
  });
});
