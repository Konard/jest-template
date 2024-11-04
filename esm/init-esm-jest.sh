#!/bin/bash

# Install Jest and Babel dependencies
yarn add --dev jest @babel/preset-env babel-jest

# Create .babelrc file
echo '{
  "presets": [
    "@babel/preset-env"
  ]
}' > .babelrc

# Create jest.config.js file
echo 'export default {
  transform: {
    "^.+\\.cjs$": "babel-jest",
    "^.+\\.mjs$": "babel-jest"
  },
  testMatch: ["**/tests/**/*.?([mc])[jt]s?(x)", "**/?(*.)+(spec|test).?([mc])[jt]s?(x)"]
};' > jest.config.js

# Update package.json using jq
if [ -f "package.json" ]; then
  # Add "test" script and set "type" to "module"
  jq '.scripts.test = "NODE_OPTIONS=\"--experimental-vm-modules\" jest" | .type = "module"' package.json > temp.json && mv temp.json package.json
  echo "Test script and type module set in package.json."
else
  echo "package.json not found."
fi

echo "Setup complete! Jest and Babel have been configured."