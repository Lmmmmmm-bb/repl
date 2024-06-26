import type { FC, SVGProps } from 'react';

const Npm: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4 28V4h24v24zM8.5 8.5v15H16v-12h4.5v12h3v-15z"
    />
  </svg>
);

export default Npm;
