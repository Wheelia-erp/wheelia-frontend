import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

export default function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        'border-b last:border-none transition-colors',
        className
      )}
      {...props}
    />
  );
}
