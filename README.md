## Web Workers & WASM Example

Comparision of three ways of handling computationally expensive procedures. In this example we're basing on no optimized recursive algorithm for calculating n-th Fibonacci number. While doing this computation in standard way for "big" numbers (greater than 40) the whole UI is blocked and not responsive. On the other hand by using [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) we're able to run this computation in the background. As a result the UI is fully responsive. Additionaly we're also using function written in [Rust](https://www.rust-lang.org/) and compiled to [WASM](https://webassembly.org/). Again, for the quite "big" numbers time of computation is far better for __WASM__ code instead of JS.

### Demo

Demo is available [here](https://web-workers-example.web.app/). _CI/CD_ has been configured to automatically deploy any changes using [firebase](https://firebase.google.com/) CLI.

### Build & Run :construction_worker:

#### Local

```
yarn build:wasm
yarn install
yarn start
```

#### Docker

Type `docker-compose up -d` and then navigate to `http://localhost:8080/`.

#### Unit Tests :warning:

UTs are failing because of problem with imported WASM function.
