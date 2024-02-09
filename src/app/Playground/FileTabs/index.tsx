import { type FC, useState } from 'react';
import { files } from './config';
import Tabs from '~/components/Tabs';
import { cn } from '~/utils/cn';

const FileTabs: FC = () => {
  const [activeLabel, setActiveLabel] = useState('App.tsx');

  const handleTabClick = (nextLabel: string) => {
    setActiveLabel(nextLabel);
  };

  return (
    <Tabs>
      {
        files.map((item) => {
          const isActive = item.label === activeLabel;

          return (
            <Tabs.Item
              key={item.label}
              title={item.label}
              active={isActive}
              className={cn(isActive && 'text-brand')}
              onClick={(e) => {
                e.currentTarget.scrollIntoView();
                handleTabClick(item.label);
              }}
            >
              {item.icon}
              {item.label}
            </Tabs.Item>
          );
        })
      }
    </Tabs>
  );
};

export default FileTabs;
