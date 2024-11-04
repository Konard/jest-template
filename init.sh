#!/bin/bash

# Define the repository name
REPO_NAME="js-jest-repo"

# Create and navigate into the project directory
mkdir "$REPO_NAME"
cd "$REPO_NAME" || exit

# Initialize a new Node.js project with Yarn
yarn init -y

# Add Jest as a development dependency
yarn add jest -D

# Configure Jest to support both .mjs and .cjs test files
cat > jest.config.js <<EOL
export default {
  transform: {
    '^.+\\.cjs$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest'
  },
  extensionsToTreatAsEsm: ['.mjs']
};
EOL

# Install Babel to handle ES modules and CommonJS in Jest
yarn add @babel/preset-env -D

# Add Babel config
cat > babel.config.js <<EOL
export default {
  presets: ['@babel/preset-env']
};
EOL

# Update package.json to use Jest with module type "module"
jq '. + { "type": "module", "scripts": { "test": "jest" } }' package.json > package.json.tmp && mv package.json.tmp package.json

# Create a sample test file in CommonJS format
mkdir tests
cat > tests/sample.test.cjs <<EOL
const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
EOL

# Create a sample test file in ESM format
cat > tests/sample.test.mjs <<EOL
const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
EOL

echo "JavaScript repository with Jest setup complete. Run tests with: yarn test"