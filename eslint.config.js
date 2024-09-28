import antfu from '@antfu/eslint-config';

import stylisticJsx from '@stylistic/eslint-plugin-jsx';
import reactCompiler from 'eslint-plugin-react-compiler';

export default antfu(
  {
    react: true,
  },
  {
    files: ['**/*.tsx'],
    plugins: {
      'react-compiler': reactCompiler,
      '@stylistic/jsx': stylisticJsx,
    },
    rules: {
      'react/prop-types': 'off',
      'react-compiler/react-compiler': 'error',
      'style/jsx-self-closing-comp': 'error',
    },
  },
  {
    rules: {
      'antfu/no-top-level-await': 'off',
      'antfu/top-level-function': 'off',

      'curly': ['error', 'all'],
      'ts/no-unused-expressions': 'off',

      'style/semi': ['error', 'always'],
      'style/member-delimiter-style': ['error', {}],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],

      'arrow-body-style': ['error', 'as-needed'],
    },
  },
);
