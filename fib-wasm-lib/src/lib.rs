use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fib_wasm(n: i32) -> i32 {
    if n == 0 || n == 1 {
        return n;
    }
    return fib_wasm(n - 1) + fib_wasm(n - 2);
}

#[test]
fn add_test() {
    assert_eq!(8, fib_wasm(6));
}
