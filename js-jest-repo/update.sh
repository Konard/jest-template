#!/bin/bash

# Create src and tests directories if they don't exist
mkdir -p src tests

# Create sample.cjs in src folder
cat > src/sample.cjs <<EOL
// CommonJS export
const sum = (a, b) => a + b;

module.exports = { sum };
EOL

# Create sample.mjs in src folder
cat > src/sample.mjs <<EOL
// ES module export
export const sum = (a, b) => a + b;
EOL

# Create sample.test.cjs in tests folder
cat > tests/sample.test.cjs <<EOL
// CommonJS style test
const sum = require('../src/sample.cjs').sum;

test('adds 1 + 2 to equal 3 (CommonJS)', () => {
  expect(sum(1, 2)).toBe(3);
});

// ESM style test using dynamic import
test('adds 1 + 2 to equal 3 (ESM)', async () => {
  const { sum: esmSum } = await import('../src/sample.mjs');
  expect(esmSum(1, 2)).toBe(3);
});
EOL

# Create sample.test.mjs in tests folder
cat > tests/sample.test.mjs <<EOL
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
EOL

echo "src and tests folders have been updated with sample files."