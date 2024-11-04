import { sum as staticMjsSum } from '../src/sample.mjs';
import { sum as staticCjsSum } from '../src/sample.cjs';

// ESM style test using static import for .mjs
test('adds 1 + 2 to equal 3 (static import of mjs)', () => {
  const sum = staticMjsSum;
  expect(sum(1, 2)).toBe(3);
});

// CommonJS style test using static import for .cjs
test('adds 1 + 2 to equal 3 (static import of cjs)', () => {
  const sum = staticCjsSum;
  expect(sum(1, 2)).toBe(3);
});

// ESM style test using dynamic import for .mjs
test('adds 5 + 6 to equal 11 (dynamic import of mjs)', async () => {
  const { sum: dynMjsSum } = await import('../src/sample.mjs');
  expect(dynMjsSum(5, 6)).toBe(11);
});

// CommonJS style test using dynamic import for .cjs
test('adds 1 + 2 to equal 3 (dynamic import of cjs)', async () => {
  const { sum: cjsSum } = await import('../src/sample.cjs');
  expect(cjsSum(1, 2)).toBe(3);
});

// CommonJS style test using dynamic require for .cjs
test('adds 3 + 4 to equal 7 (dynamic require of cjs)', async () => {
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
  }).toThrow(/must use import to load es module/i);
});