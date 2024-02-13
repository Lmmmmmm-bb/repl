import type { FC } from 'react';
import type { NpmPackage } from './types';
import { cn } from '~/utils/cn';
import Link from '~/icons/Link';
import GitHub from '~/icons/GitHub';
import Npm from '~/icons/Npm';
import Cube from '~/icons/Cube';
import Bug from '~/icons/Bug';
import Calendar from '~/icons/Calendar';
import Button from '~/components/ui/Button';
import Download from '~/icons/Download';

interface PackageProps {
  npmPackage: NpmPackage;
}

const Package: FC<PackageProps> = ({ npmPackage }) => (
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
            <a
              target="_blank"
              rel="noreferrer"
              title="Open package homepage"
              className="transition-opacity opacity-40 hover:opacity-80"
              href={npmPackage.links.homepage}
            >
              <Link className="w-5 h-5" />
            </a>
          )}

          {npmPackage.links.npm && (
            <a
              target="_blank"
              rel="noreferrer"
              title="Open in npm"
              className="transition-opacity opacity-40 hover:opacity-80"
              href={npmPackage.links.homepage}
            >
              <Npm className="w-5 h-5" />
            </a>
          )}

          {npmPackage.links.repository && (
            <a
              target="_blank"
              rel="noreferrer"
              title="Open in GitHub"
              className="transition-opacity opacity-40 hover:opacity-80"
              href={npmPackage.links.repository}
            >
              <GitHub className="w-5 h-5" />
            </a>
          )}

          {npmPackage.links.bugs && (
            <a
              target="_blank"
              rel="noreferrer"
              title="Report issue"
              className="transition-opacity opacity-40 hover:opacity-80"
              href={npmPackage.links.bugs}
            >
              <Bug className="w-5 h-5" />
            </a>
          )}
        </div>

        <Button
          size="sm"
          variant="ghost"
          className="flex gap-2 transition-opacity opacity-0 group-hover:opacity-100"
          title={`Install ${npmPackage.name}`}
        >
          <Download className="w-4 h-4" />
          Install
        </Button>
      </div>

    </div>

  </div>
);

export default Package;
