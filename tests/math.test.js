const {
  calculateTip,
  fahrenheitToCelsius,
  celciusToFahrenheit,
  add,
} = require("../src/math");

test("Should Calculate total with tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});

test("Should calculate total with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test("should convert 32 F to 0 C", () => {
  const tempF2C = fahrenheitToCelsius(32);
  expect(tempF2C).toBe(0);
});

test("should convert 0C to 32F", () => {
  const tempC2F = celciusToFahrenheit(0);
  expect(tempC2F).toBe(32);
});

// test("Async test demo", (done) => {
//   setTimeout(() => {
//     expect(1).toBe(2);
//     done();
//   }, 2000);
// });

test("Should add two numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test("Should add two numbers async/await", async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});
