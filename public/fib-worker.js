const fib = (n) => {
  if (n === 0 || n === 1) return n;
  return fib(n - 2) + fib(n - 1);
};

onmessage = (event) => {
  const { nth } = event.data;

  const startTime = new Date().getTime();
  const fibNum = fib(nth);
  const time = new Date().getTime() - startTime;

  postMessage({
    fibNum,
    time,
  });
};
