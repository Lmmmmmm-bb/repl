import type { FC } from 'react';
import { DEVICE_SIZE } from './config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '~/components/ui/Select';
import Devices from '~/icons/Devices';
import Container from '~/components/Container';
import { cn } from '~/utils/cn';

const { Action } = Container;

interface DeviceSelectProps {
  value: keyof typeof DEVICE_SIZE;
  onChange: (value: keyof typeof DEVICE_SIZE) => void;
}

const DeviceSelect: FC<DeviceSelectProps> = ({ value, onChange }) => (
  <Select value={value} onValueChange={onChange}>
    <Action asChild className={cn('gap-1', value !== 'Default' && 'opacity-80')}>
      <SelectTrigger title="Select device" className="h-full">
        <Devices className="size-5" />
        {value !== 'Default' && value}
      </SelectTrigger>
    </Action>

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
