import type { RequiredOptions } from 'prettier';

export const prettierConfig: Partial<RequiredOptions> = {
  tabWidth: 2,
  endOfLine: 'lf',
  trailingComma: 'all',
  arrowParens: 'always',
  semi: true,
  useTabs: false,
  singleQuote: true,
  bracketSpacing: true,
  jsxSingleQuote: true,
  bracketSameLine: false,
};
