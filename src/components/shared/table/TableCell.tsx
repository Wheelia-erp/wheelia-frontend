import { cn } from '@/lib/utils';
import { HTMLAttributes, ReactNode } from 'react';

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
}

export default function TableCell({
  children,
  className,
  align = 'left',
  ...props
}: TableCellProps) {
  return (
    <td
      className={cn(
        'px-4 py-3 text-sm text-gray-800 align-middle',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}
