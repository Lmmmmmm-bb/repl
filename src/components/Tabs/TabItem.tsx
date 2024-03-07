import {
  type HTMLAttributes,
  type MouseEvent,
  type PropsWithChildren,
  forwardRef,
} from 'react';
import Button from '../ui/Button';
import Close from '~/icons/Close';
import { cn } from '~/utils/cn';

interface TabItemProps extends HTMLAttributes<HTMLLIElement> {
  active?: boolean;
  closable?: boolean;
  onCloseClick?: () => void;
}

const TabItem = forwardRef<HTMLLIElement, PropsWithChildren<TabItemProps>>(({
  className,
  active,
  closable,
  children,
  onCloseClick,
  ...props
}, ref) => {
  const handleClickClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCloseClick && onCloseClick();
  };

  return (
    <li
      ref={ref}
      {...props}
      className={cn(
        ['px-4', 'h-full', 'min-w-fit', 'relative'],
        ['flex', 'items-center', 'gap-1'],
        ['hover:bg-light-600', 'dark:hover:bg-dark-800'],
        ['border-r-[1px]', 'cursor-pointer'],
        active && [
          'after:absolute',
          'after:bottom-0',
          'after:left-0',
          'after:right-0',
          'after:h-[2px]',
          'after:bg-current',
          'after:rounded-t',
        ],
        className,
      )}
    >
      {children}
      {closable && (
        <Button
          size="icon"
          variant="ghost"
          className="size-4"
          onClick={handleClickClose}
        >
          <Close />
        </Button>
      )}
    </li>
  );
});

TabItem.displayName = 'TabItem';

export default TabItem;
