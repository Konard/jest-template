// CommonJS style test
const { sum } = require('../src/sample.cjs');

// CommonJS style test using static import for .mjs
test('adds 1 + 2 to equal 3 (static require of cjs)', () => {
  expect(sum(1, 2)).toBe(3);
});

// ESM style test using dynamic import for mjs
test('adds 1 + 2 to equal 3 (dynamic import of mjs)', async () => {
  const { sum: esmSum } = await import('../src/sample.mjs');
  expect(esmSum(1, 2)).toBe(3);
});

// ESM style test using dynamic import for cjs
test('adds 1 + 2 to equal 3 (dynamic import of cjs)', async () => {
  const { sum: esmSum } = await import('../src/sample.cjs');
  expect(esmSum(1, 2)).toBe(3);
});

// CommonJS style test using dynamic require for cjs
test('adds 3 + 4 to equal 7 (dynamic require of cjs)', () => {
  const { sum: dynSum } = require('../src/sample.cjs');
  expect(dynSum(3, 4)).toBe(7);
});

// CommonJS style test using dynamic require for mjs (expected to always throw)
test('adds 3 + 4 to equal 7 (dynamic require of mjs)', () => {
  expect(() => {
    require('../src/sample.mjs');
  }).toThrow(/must use import to load es module/i);
});
