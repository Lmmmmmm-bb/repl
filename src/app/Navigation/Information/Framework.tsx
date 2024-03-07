import type { FC } from 'react';
import Vite from '~/icons/Vite';
import React from '~/icons/React';
import Tailwind from '~/icons/Tailwind';

const Framework: FC = () => (
  <div className="flex items-center gap-1">
    Built with
    <a
      target="_blank"
      rel="noreferrer"
      title="React website"
      href="https://react.dev/"
      className="flex items-center gap-0.5 font-semibold hover:underline"
    >
      <React className="size-4 text-brand" />
      React
    </a>
    ·
    <a
      target="_blank"
      rel="noreferrer"
      title="Vite website"
      href="https://vitejs.dev/"
      className="flex items-center gap-0.5 font-semibold hover:underline"
    >
      <Vite className="size-4" />
      Vite
    </a>
    ·
    <a
      target="_blank"
      rel="noreferrer"
      title="Tailwind website"
      href="https://tailwindcss.com/"
      className="flex items-center gap-0.5 font-semibold hover:underline"
    >
      <Tailwind className="size-4" />
      Tailwind
    </a>
  </div>
);

export default Framework;
