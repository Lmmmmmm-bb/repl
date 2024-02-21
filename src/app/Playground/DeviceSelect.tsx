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
        ['h-full', 'w-fit', 'p-2'],
        ['hover:bg-accent', 'hover:text-accent-foreground'],
        ['border-0', 'border-l', 'rounded-none'],
        ['opacity-60', 'hover:opacity-80'],
        ['transition-opacity'],
        value !== 'Default' && ['opacity-80'],
      )}
    >
      <div className="text-xs flex items-center gap-1">
        <Devices className="w-5 h-5" />
        {value !== 'Default' && value}
      </div>
    </SelectTrigger>

    <SelectContent>
      {Object.keys(DEVICE_SIZE).map(deviceName => (
        <SelectItem key={deviceName} value={deviceName}>
          {deviceName}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default DeviceSelect;
