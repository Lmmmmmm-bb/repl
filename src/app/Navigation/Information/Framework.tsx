import type { FC } from 'react';
import Vite from '~/icons/Vite';
import React from '~/icons/React';
import Tailwind from '~/icons/Tailwind';
import Shadcn from '~/icons/Shadcn';

const Framework: FC = () => (
  <div className="flex items-center gap-1">
    Built with
    <div className="flex items-center gap-1 select-none">
      <a
        target="_blank"
        rel="noreferrer"
        title="React"
        href="https://react.dev/"
      >
        <React className="size-4 text-brand" />
      </a>
      ·
      <a
        target="_blank"
        rel="noreferrer"
        title="Vite"
        href="https://vitejs.dev/"
      >
        <Vite className="size-4" />
      </a>
      ·
      <a
        target="_blank"
        rel="noreferrer"
        title="Tailwind"
        href="https://tailwindcss.com/"
      >
        <Tailwind className="size-4" />
      </a>
      ·
      <a
        target="_blank"
        rel="noreferrer"
        title="Shadcn"
        href="https://ui.shadcn.com/"
      >
        <Shadcn className="size-3" />
      </a>
    </div>
  </div>
);

export default Framework;
