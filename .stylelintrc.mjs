export default {
  extends: 'stylelint-config-standard',
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'config',
          'theme',
          'source',
          'custom-variant',
          'plugin',
          'utility',
        ],
      },
    ],
    'no-invalid-position-at-import-rule': null,
    'import-notation': null,
  },
};
