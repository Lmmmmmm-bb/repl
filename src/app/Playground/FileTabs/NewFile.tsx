import { useRef, useState } from 'react';
import type { FC, KeyboardEvent } from 'react';
import { virtualFileExtIconStrategy } from './strategy';
import { useErrorMessage } from './useErrorMessage';
import Tabs from '~/components/Tabs';
import Plus from '~/icons/Plus';
import File from '~/icons/File';
import { getVirtualFileExt, isValidFilename } from '~/virtual-file';
import { useToggle } from '~/hooks/useToggle';
import { addFile } from '~/stores/virtual-file';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/Popover';
import { cn } from '~/utils/cn';

const NewFile: FC = () => {
  const addTabItemRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    open,
    errorMessage,
    updateMessage,
    clearMessage,
  } = useErrorMessage();

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
    clearMessage();
    setInputValue('');
    togglePending.off();
  };

  const handleAddFileDone = () => {
    if (inputValue.length === 0) {
      resetNewFileState();
      return;
    }

    try {
      addFile(inputValue);
      setInputValue('');
      togglePending.off();
      setTimeout(() =>
        addTabItemRef.current && addTabItemRef.current.scrollIntoView(),
      );
      clearMessage();
    } catch (error) {
      if (error instanceof Error) {
        const isFileExistError = error.message.includes('already exists');
        updateMessage({
          type: isFileExistError ? 'warning' : 'error',
          message: error.message,
        });
      }
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const isEnter = e.key === 'Enter';
    const isEsc = e.key === 'Escape';
    isEnter && handleAddFileDone();
    isEsc && resetNewFileState();
  };

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Tabs.Item title="New file" ref={addTabItemRef} onClick={handleAddFile}>
          {pending
            ? (
              <>
                {isValidFilename(inputValue)
                  ? virtualFileExtIconStrategy[getVirtualFileExt(inputValue)]
                  : <File className="w-4 h-4 opacity-60" />}
                <input
                  spellCheck={false}
                  placeholder="input filename..."
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
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          ['p-2', 'text-white', 'text-xs', 'font-mono', 'transition-colors'],
          errorMessage.type === 'error' && ['bg-destructive'],
          errorMessage.type === 'warning' && ['bg-orange-500', 'dark:bg-orange-800'],
        )}
      >
        {errorMessage.message}
      </PopoverContent>
    </Popover>
  );
};

export default NewFile;
