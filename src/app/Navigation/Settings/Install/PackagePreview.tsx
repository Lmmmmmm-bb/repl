import type { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react';
import type { NpmPackage } from './types';
import PackageInstall from './PackageInstall';
import { cn } from '~/utils/cn';
import Link from '~/icons/Link';
import GitHub from '~/icons/GitHub';
import Npm from '~/icons/Npm';
import Cube from '~/icons/Cube';
import Bug from '~/icons/Bug';
import Calendar from '~/icons/Calendar';
import { useExtraLibStore } from '~/stores/extra-lib';

interface PackagePreviewProps {
  npmPackage: NpmPackage;
}

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

const PackagePreview: FC<PackagePreviewProps> = ({ npmPackage }) => {
  const extraLibs = useExtraLibStore(state => state.extraLibs);
  const extraLibsName = extraLibs.map(lib => lib.name);

  return (
    <div
      className={cn(
        ['h-52', 'p-4', 'flex', 'flex-col'],
        ['border', 'rounded-md', 'group'],
      )}
    >
      <span className="text-xl">{npmPackage.name}</span>

      {npmPackage.description && (
        <p
          className="text-sm line-clamp-3 leading-tight text-gray-500"
          title={npmPackage.description}
        >
          {npmPackage.description}
        </p>
      )}

      <div className="mt-auto flex flex-col gap-1 opacity-80 text-sm">
        <span title="Latest version" className="flex items-center gap-2">
          <Cube className="w-5 h-5" />
          {npmPackage.version}
        </span>

        {npmPackage.date && (
          <span title="Latest version publish date" className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {new Date(npmPackage.date).toLocaleString()}
          </span>
        )}

        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2">
            {npmPackage.links.homepage && (
              <PackageLink title="Open package homepage" href={npmPackage.links.homepage}>
                <Link className="w-5 h-5" />
              </PackageLink>
            )}

            {npmPackage.links.npm && (
              <PackageLink title="Open in npm" href={npmPackage.links.npm}>
                <Npm className="w-5 h-5" />
              </PackageLink>
            )}

            {npmPackage.links.repository && (
              <PackageLink title="Open in GitHub" href={npmPackage.links.repository}>
                <GitHub className="w-5 h-5" />
              </PackageLink>
            )}

            {npmPackage.links.bugs && (
              <PackageLink title="Report issue" href={npmPackage.links.bugs}>
                <Bug className="w-5 h-5" />
              </PackageLink>
            )}
          </div>

          <PackageInstall
            isInstalled={extraLibsName.includes(npmPackage.name)}
            npmPackage={npmPackage}
          />
        </div>
      </div>
    </div>
  );
};

export default PackagePreview;
