import antfu from '@antfu/eslint-config';

export default antfu(
  {
    react: true,
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'react/prop-types': 'off',
      'react/self-closing-comp': 'error',
    },
  },
  {
    rules: {
      'antfu/top-level-function': 'off',

      'curly': ['error', 'all'],

      'style/semi': ['error', 'always'],
      'style/member-delimiter-style': ['error', {}],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],

      'arrow-body-style': ['error', 'as-needed'],
    },
  },
);
