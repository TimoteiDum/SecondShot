module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'espree',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // allow single-word component names in this project
    'vue/multi-word-component-names': 'off',
    // ignore unused function arguments (common in event handlers where 'e' is unused)
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none', 'ignoreRestSiblings': true }],
    // allow console during development
    'no-console': 'off'
  }
}
