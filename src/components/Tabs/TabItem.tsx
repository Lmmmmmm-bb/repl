import type { FC, HTMLAttributes, MouseEvent, PropsWithChildren } from 'react';
import Close from '~/icons/Close';
import { cn } from '~/utils/cn';

interface TabItemProps extends HTMLAttributes<HTMLLIElement> {
  active?: boolean;
  closable?: boolean;
  onCloseClick?: () => void;
}

const TabItem: FC<PropsWithChildren<TabItemProps>> = ({
  className,
  active,
  closable,
  children,
  onCloseClick,
  ...props
}) => {
  const handleClickClose = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    onCloseClick && onCloseClick();
  };

  return (
    <li
      {...props}
      className={cn(
        ['px-4', 'h-full', 'relative'],
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
        <Close className="w-3 h-3" onClick={handleClickClose} />
      )}
    </li>
  );
};

export default TabItem;
