const { FlatCompat } = require('@eslint/eslintrc')

// FlatCompat helps bridge traditional shareable configs (like plugin:vue/...) into the
// flat config system used by ESLint v8+. We keep the recommended Vue rules but
// override a couple of rules for developer convenience in this project.
const compat = new FlatCompat({})

module.exports = [
  // Use the new `ignores` property instead of .eslintignore (avoids the deprecation warning)
  { ignores: ['node_modules/**', 'dist/**', 'public/**', 'package-lock.json', 'yarn.lock'] },

  // Extend the standard Vue recommended + eslint:recommended rules (via compat)
  ...compat.extend('plugin:vue/vue3-recommended', 'eslint:recommended'),

  // Project-specific overrides
  {
    languageOptions: {
      parser: require.resolve('vue-eslint-parser'),
      parserOptions: {
        parser: require.resolve('espree'),
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      // allow single-word component names in this project
      'vue/multi-word-component-names': 'off',
      // ignore unused function arguments (common in event handlers)
      'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: true }],
      // allow console during development
      'no-console': 'off'
    }
  }
,
  // Add Prettier to the end so formatting rules are handled by Prettier
  ...compat.extend('prettier')
]
