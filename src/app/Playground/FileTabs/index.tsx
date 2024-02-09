import type { FC } from 'react';
import Tabs from '~/components/Tabs';
import { deleteFile, setActiveFile, useVirtualFileStore } from '~/stores/virtual-file';
import { cn } from '~/utils/cn';
import { getVirtualFileExt } from '~/virtual-file';
import { virtualFileExtIconStrategy } from '~/virtual-file/strategy';

const FileTabs: FC = () => {
  const { files, activeFile } = useVirtualFileStore();

  return (
    <Tabs>
      {
        Object.values(files).map((item) => {
          const isActive = item.filename === activeFile?.filename;

          return (
            <Tabs.Item
              key={item.filename}
              title={item.filename}
              active={isActive}
              closable={item.filename !== 'App.tsx'}
              className={cn(isActive && 'text-brand')}
              onClick={(e) => {
                e.currentTarget.scrollIntoView();
                setActiveFile(item);
              }}
              onCloseClick={() => deleteFile(item.filename)}
            >
              {virtualFileExtIconStrategy[getVirtualFileExt(item.filename)]}
              {item.filename}
            </Tabs.Item>
          );
        })
      }
    </Tabs>
  );
};

export default FileTabs;
