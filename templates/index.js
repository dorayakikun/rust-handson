const js = import("./pkg/rust_handson");

js.then(js => {
  js.greet("World!");
});