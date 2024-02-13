import { useRef, useState } from 'react';
import type { FC, KeyboardEvent } from 'react';
import Tabs from '~/components/Tabs';
import Plus from '~/icons/Plus';
import { cn } from '~/utils/cn';
import { getVirtualFileExt, isValidFilename } from '~/virtual-file';
import { virtualFileExtIconStrategy } from '~/virtual-file/strategy';
import {
  addFile,
  deleteFile,
  setActiveFile,
  useVirtualFileStore,
} from '~/stores/virtual-file';
import File from '~/icons/File';
import { useToggle } from '~/hooks/useToggle';

const FileTabs: FC = () => {
  const { files, activeFile } = useVirtualFileStore();

  const addTabItemRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [pending, togglePending] = useToggle();
  const [inputValue, setInputValue] = useState('');

  const handleDeleteFile = (filename: string) => {
    // eslint-disable-next-line no-alert
    confirm(`Are you sure you want to delete ${filename}?`) && deleteFile(filename);
  };

  const handleAddFile = () => {
    if (pending) {
      return;
    }
    togglePending.on();
    addTabItemRef.current && addTabItemRef.current.scrollIntoView();
    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    });
  };

  const resetNewFileState = () => {
    setInputValue('');
    togglePending.off();
  };

  const handleAddFileDone = () => {
    if (inputValue.length === 0) {
      resetNewFileState();
      return;
    }
    addFile(inputValue);
    setInputValue('');
    togglePending.off();
    setTimeout(() => {
      addTabItemRef.current && addTabItemRef.current.scrollIntoView();
    });
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const isEnter = e.key === 'Enter';
    const isEsc = e.key === 'Escape';
    isEnter && handleAddFileDone();
    isEsc && resetNewFileState();
  };

  return (
    <Tabs>
      {Object.values(files).map((item) => {
        const isActive = activeFile && item.filename === activeFile.filename;

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
            onCloseClick={() => handleDeleteFile(item.filename)}
          >
            {virtualFileExtIconStrategy[getVirtualFileExt(item.filename)]}
            {item.filename}
          </Tabs.Item>
        );
      })}

      <Tabs.Item title="New file" ref={addTabItemRef} onClick={handleAddFile}>
        {pending
          ? (
            <>
              {
                (isValidFilename(inputValue) && virtualFileExtIconStrategy[getVirtualFileExt(inputValue)])
                || <File className="w-4 h-4 opacity-60" />
              }
              <input
                spellCheck={false}
                className="w-24 outline-none bg-transparent"
                ref={inputRef}
                value={inputValue}
                onBlur={handleAddFileDone}
                onKeyDown={handleInputKeyDown}
                onChange={e => setInputValue(e.target.value)}
              />
            </>
            )
          : <Plus className="w-4 h-4" />}
      </Tabs.Item>
    </Tabs>
  );
};

export default FileTabs;
