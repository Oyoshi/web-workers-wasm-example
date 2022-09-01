const fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2));

onmessage = (event) => {
  const { num } = event.data;

  const startTime = new Date().getTime();
  const fibNum = fib(num);

  postMessage({
    fibNum,
    time: new Date().getTime() - startTime,
  });
};
