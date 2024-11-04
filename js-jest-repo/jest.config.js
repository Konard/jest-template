export default {
  transform: {
    '^.+\.cjs$': 'babel-jest',
    '^.+\.mjs$': 'babel-jest'
  },
  testMatch: ["**/tests/**/*.[mc][jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"]
};