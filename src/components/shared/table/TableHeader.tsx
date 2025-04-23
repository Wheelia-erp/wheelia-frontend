// components/shared/table/TableHeader.tsx
import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TableHeaderProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
}

export default function TableHeader({
  children,
  className,
  align = 'left',
  ...props
}: TableHeaderProps) {
  return (
    <th
      className={cn(
        'px-4 py-3 font-semibold text-left text-gray-700',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}
