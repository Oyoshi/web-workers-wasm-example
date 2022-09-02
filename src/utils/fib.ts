export const fib = (n: number): number => (n < 2 ? n : fib(n - 2) + fib(n - 1));
