import type { ReactNode } from 'react';
import type { FileLanguageType } from './types';

import Css from '~/icons/Css';
import Json from '~/icons/Json';
import ReactIcon from '~/icons/React';
import JavaScript from '~/icons/JavaScript';
import type { FileExtensionType } from '~/virtual-file';
import TypeScript from '~/icons/TypeScript';

export const virtualFileLanguageStrategy: Record<FileExtensionType, FileLanguageType> = {
  css: 'css',
  json: 'json',
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
};

export const virtualFileExtIconStrategy: Record<FileExtensionType, ReactNode> = {
  css: <Css className="w-[13px] h-[13px] text-[#0288d1]" />,
  json: <Json className="w-[13px] h-[13px] text-[#F2C24F]" />,
  js: <JavaScript className="w-[14px] h-[14px] text-[#F7DF1E]" />,
  jsx: <ReactIcon className="w-4 h-4 text-[#54B9D1]" />,
  ts: <TypeScript className="w-[14px] h-[14px] text-brand" />,
  tsx: <ReactIcon className="w-4 h-4 text-brand" />,
};
