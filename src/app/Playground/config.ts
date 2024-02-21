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

export const DEVICE_SIZE = {
  'Default': [0, 0] as const,
  'iPhone SE': [375, 667] as const,
  'iPhone XR': [414, 896] as const,
  'iPhone 12 Pro': [390, 844] as const,
  'iPhone 14 Pro Max': [430, 932] as const,
  'Pixel 7': [412, 915] as const,
  'Samsung Galaxy S8': [360, 740] as const,
  'Samsung Galaxy S20 Ultra': [412, 915] as const,
  'iPad Mini': [768, 1024] as const,
  'iPad Air': [820, 1180] as const,
  'iPad Pro': [1024, 1366] as const,
  'Surface Pro 7': [912, 1368] as const,
};
