import { sum as staticMjsSum } from '../src/sample.mjs';
import { sum as staticCjsSum } from '../src/sample.cjs';

// ESM style test
test('adds 1 + 2 to equal 3 (ESM)', () => {
  const sum = staticMjsSum;
  expect(sum(1, 2)).toBe(3);
});

// CommonJS style test
test('adds 1 + 2 to equal 3 (ESM)', () => {
  const sum = staticCjsSum;
  expect(sum(1, 2)).toBe(3);
});

// CommonJS style test using dynamic import
test('adds 1 + 2 to equal 3 (CommonJS)', async () => {
  const { sum: cjsSum } = await import('../src/sample.cjs');
  expect(cjsSum(1, 2)).toBe(3);
});

// ESM style test using dynamic import for .mjs
test('adds 5 + 6 to equal 11 (dynamic ESM import)', async () => {
  const { sum: dynMjsSum } = await import('../src/sample.mjs');
  expect(dynMjsSum(5, 6)).toBe(11);
});

// CommonJS style test using dynamic require
test('adds 3 + 4 to equal 7 (dynamic require)', async () => {
  const { createRequire } = await import('module');
  const { fileURLToPath } = await import('url');
  const __filename = fileURLToPath(import.meta.url);
  const require = createRequire(__filename);
  const { sum: dynSum } = require('../src/sample.cjs');
  expect(dynSum(3, 4)).toBe(7);
});

// CommonJS style test using dynamic require for .mjs (expected to always throw)
test('throws error when requiring .mjs file using require', async () => {
  const { createRequire } = await import('module');
  const { fileURLToPath } = await import('url');
  const __filename = fileURLToPath(import.meta.url);
  const require = createRequire(__filename);

  expect(() => {
    require('../src/sample.mjs');
  }).toThrow(/must use import to load ES Module/i);
});