export default {
  extends: 'stylelint-config-standard',
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
    'no-invalid-position-at-import-rule': null,
    'import-notation': null,
    'comment-empty-line-before': null,
    'rule-empty-line-before': null,
  },
};
