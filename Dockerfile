FROM rust as wasm-pkg
WORKDIR /app

COPY fib-wasm-lib /app/fib-wasm-lib
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
RUN cd fib-wasm-lib && wasm-pack build --target web --out-dir pkg

FROM node as prod
WORKDIR /app
COPY --from=wasm-pkg /app/fib-wasm-lib /app/fib-wasm-lib
COPY package.json .
COPY yarn.lock .
COPY fib-wasm-lib/* .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=prod /app/build /usr/share/nginx/html
