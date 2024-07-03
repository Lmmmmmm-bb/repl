import antfu from '@antfu/eslint-config';

import reactCompiler from 'eslint-plugin-react-compiler';

export default antfu(
  {
    react: true,
  },
  {
    files: ['**/*.tsx'],
    plugins: {
      'react-compiler': reactCompiler,
    },
    rules: {
      'react/prop-types': 'off',
      'react/self-closing-comp': 'error',
      'react-compiler/react-compiler': 'error',
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
