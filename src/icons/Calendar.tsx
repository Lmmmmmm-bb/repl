import type { FC, SVGProps } from 'react';

const Calendar: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="currentColor"
      d="M26 4h-4V2h-2v2h-8V2h-2v2H6c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 22H6V12h20zm0-16H6V6h4v2h2V6h8v2h2V6h4z"
    />
  </svg>
);

export default Calendar;
