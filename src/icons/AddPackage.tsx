import type { FC, SVGProps } from 'react';

const AddPackage: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="currentColor"
      d="M21.49 13.115l-9-5a1 1 0 0 0-1 0l-9 5A1.008 1.008 0 0 0 2 14v9.995a1 1 0 0 0 .52.87l9 5A1.004 1.004 0 0 0 12 30a1.056 1.056 0 0 0 .49-.135l9-5A.992.992 0 0 0 22 24V14a1.008 1.008 0 0 0-.51-.885zM11 27.295l-7-3.89v-7.72l7 3.89zm1-9.45L5.06 14L12 10.135l6.94 3.86zm8 5.56l-7 3.89v-7.72l7-3.89z"
    />
    <path d="M30 6h-4V2h-2v4h-4v2h4v4h2V8h4V6z" fill="currentColor" />
  </svg>
);

export default AddPackage;
