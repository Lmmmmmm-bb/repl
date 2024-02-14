import type { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react';

const PackageLink: FC<PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>> = ({ children, ...props }) => (
  <a
    {...props}
    target="_blank"
    rel="noreferrer"
    className="transition-opacity opacity-40 hover:opacity-80"
  >
    {children}
  </a>
);

export default PackageLink;
