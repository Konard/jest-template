import { sum } from '../src/sample.mjs';

// ESM style test
test('adds 1 + 2 to equal 3 (ESM)', () => {
  expect(sum(1, 2)).toBe(3);
});

// CommonJS style test using dynamic import
test('adds 1 + 2 to equal 3 (CommonJS)', async () => {
  const { sum: cjsSum } = await import('../src/sample.cjs');
  expect(cjsSum(1, 2)).toBe(3);
});

// CommonJS style test using dynamic require
test('adds 3 + 4 to equal 7 (dynamic require)', () => {
  const { sum: dynSum } = require('../src/sample.cjs');
  expect(dynSum(3, 4)).toBe(7);
});
