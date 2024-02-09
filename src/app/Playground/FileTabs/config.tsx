import Css from '~/icons/Css';
import Html from '~/icons/Html';
import JavaScript from '~/icons/JavaScript';
import Json from '~/icons/Json';
import React from '~/icons/React';
import TypeScript from '~/icons/TypeScript';
import { cn } from '~/utils/cn';

export const files = [
  {
    label: 'App.tsx',
    icon: <React className="w-4 h-4 text-brand" />,
  },
  {
    label: 'index.tsx',
    icon: <TypeScript className="w-[14px] h-[14px] text-brand" />,
  },
  {
    label: 'test.jsx',
    icon: (
      <JavaScript
        className={cn(
          ['w-[14px]', 'h-[14px]'],
          ['text-[#F7DF1E]'],
        )}
      />
    ),
  },
  {
    label: 'index.css',
    icon: (
      <Css
        className={cn(
          ['w-[13px]', 'h-[13px]'],
          ['text-[#0288d1]'],
        )}
      />
    ),
  },
  {
    label: 'package.json',
    icon: (
      <Json
        className={cn(
          ['w-[13px]', 'h-[13px]'],
          ['text-[#F2C24F]'],
        )}
      />
    ),
  },
  {
    label: 'index.html',
    icon: <Html />,
  },
];
