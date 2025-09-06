module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['@typescript-eslint', 'tailwindcss'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/enforces-shorthand': 'warn',
    'tailwindcss/no-unnecessary-arbitrary-value': 'warn',
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
  },
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva', 'clsx'],
    },
  },
};
