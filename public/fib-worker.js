const fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2));

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
