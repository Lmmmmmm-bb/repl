import type {
  ComponentProps,
  FC,
  MouseEvent,
} from 'react';
import Close from '~/icons/Close';
import { cn } from '~/utils/cn';
import Button from '../ui/Button';

interface TabItemProps {
  active?: boolean;
  closable?: boolean;
  onCloseClick?: () => void;
}

const TabItem: FC<ComponentProps<'li'> & TabItemProps> = ({
  className,
  active,
  closable,
  children,
  onCloseClick,
  ...props
}) => {
  const handleClickClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCloseClick && onCloseClick();
  };

  return (
    <li
      {...props}
      className={cn(
        ['px-4', 'h-full', 'min-w-fit', 'relative'],
        ['flex', 'items-center', 'gap-1'],
        ['hover:bg-light-600', 'dark:hover:bg-dark-800'],
        ['border-r-[1px]', 'cursor-pointer'],
        [
          'after:absolute',
          'after:bottom-0',
          'after:left-0',
          'after:right-0',
          'after:h-0',
          'after:bg-current',
          'after:rounded-t',
          'after:transition-all',
        ],
        active && ['after:h-[2px]'],
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
};

TabItem.displayName = 'TabItem';

export default TabItem;
