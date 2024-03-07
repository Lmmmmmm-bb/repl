import type { FC } from 'react';
import Framework from './Framework';
import Button from '~/components/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/Popover';
import InformationIcon from '~/icons/Information';

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
      <div className="flex items-center gap-1">
        {`Playground Built at ${__BUILD_TIME__}`}
      </div>
      <Framework />
    </PopoverContent>
  </Popover>
);

export default Information;
