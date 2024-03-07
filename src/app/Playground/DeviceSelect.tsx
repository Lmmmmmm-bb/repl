import type { FC } from 'react';
import { DEVICE_SIZE } from './config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '~/components/ui/Select';
import Devices from '~/icons/Devices';
import { cn } from '~/utils/cn';
import { buttonVariants } from '~/components/ui/Button/config';

interface DeviceSelectProps {
  value: keyof typeof DEVICE_SIZE;
  onChange: (value: keyof typeof DEVICE_SIZE) => void;
}

const DeviceSelect: FC<DeviceSelectProps> = ({ value, onChange }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger
      hiddenIcon
      title="Select device"
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        ['h-full', 'w-fit', 'p-2'],
        ['border-0', 'border-l', 'rounded-none'],
        ['opacity-60', 'hover:opacity-80'],
        ['transition-opacity'],
        value !== 'Default' && ['opacity-80'],
      )}
    >
      <div className="text-xs flex items-center gap-1 select-none">
        <Devices className="size-5" />
        {value !== 'Default' && value}
      </div>
    </SelectTrigger>

    <SelectContent>
      {Object.keys(DEVICE_SIZE).map((deviceName) => {
        const [deviceWidth, deviceHeight] = DEVICE_SIZE[deviceName as keyof typeof DEVICE_SIZE];
        const isDefaultDevice = deviceName === 'Default';
        return (
          <SelectItem
            key={deviceName}
            value={deviceName}
            title={!isDefaultDevice ? `${deviceWidth} x ${deviceHeight}` : undefined}
          >
            {deviceName}
          </SelectItem>
        );
      })}
    </SelectContent>
  </Select>
);

export default DeviceSelect;
