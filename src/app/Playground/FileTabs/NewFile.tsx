import { useRef, useState } from 'react';
import type { FC, KeyboardEvent } from 'react';
import { virtualFileExtIconStrategy } from './strategy';
import Tabs from '~/components/Tabs';
import Plus from '~/icons/Plus';
import File from '~/icons/File';
import { getVirtualFileExt, isValidFilename } from '~/virtual-file';
import { useToggle } from '~/hooks/useToggle';
import { addFile } from '~/stores/virtual-file';

const NewFile: FC = () => {
  const addTabItemRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [pending, togglePending] = useToggle();
  const [inputValue, setInputValue] = useState('');

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
    <Tabs.Item title="New file" ref={addTabItemRef} onClick={handleAddFile}>
      {pending
        ? (
          <>
            {isValidFilename(inputValue)
              ? virtualFileExtIconStrategy[getVirtualFileExt(inputValue)]
              : <File className="w-4 h-4 opacity-60" />}
            <input
              spellCheck={false}
              className="w-24 outline-none bg-transparent"
              placeholder="input filename..."
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
  );
};

export default NewFile;
