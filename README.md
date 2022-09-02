## Web Workers Example

Comparision of two ways of handling computationally expensive procedures. In this example we're basing on no optimized recursive algorithm for calculating n-th Fibonacci number. While doing this computation in standard way for "big" number (greater than 40) the whole UI is blocked and not responsive. On the other hand by using [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) we're able to run this computation in the background. As a result the UI is fully responsive.

### Demo

Demo is available [here](https://web-workers-example.web.app/). _CI/CD_ has been configured to automatically deploy any changes using [firebase](https://firebase.google.com/) CLI.
