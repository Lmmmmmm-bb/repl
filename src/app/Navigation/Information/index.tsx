import type { FC } from 'react';
import Framework from './Framework';
import Button from '~/components/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/Popover';
import InformationIcon from '~/icons/Information';
import { cn } from '~/utils/cn';

const Information: FC = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button title="Playground information" variant="ghost" size="icon">
        <InformationIcon className="size-5" />
      </Button>
    </PopoverTrigger>

    <PopoverContent
      side="right"
      className="w-fit flex flex-col gap-1 text-sm"
    >
      <p>
        Inspired by&nbsp;
        <a
          href="https://play.vuejs.org"
          target="_blank"
          rel="noreferrer"
          className={cn(
            ['text-[#42b883]', 'hover:text-[#33a06f]', 'dark:hover:text-[#42d392]'],
            ['font-semibold', 'hover:underline', 'transition-colors'],
          )}
        >
          Vue SFC Playground
        </a>
      </p>

      <p className="flex items-center gap-1">
        {`Playground release at ${__BUILD_TIME__}`}
      </p>

      <Framework />
    </PopoverContent>
  </Popover>
);

export default Information;
