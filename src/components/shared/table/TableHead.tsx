// components/shared/table/TableHead.tsx
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export default function TableHead({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn('bg-gray-100 text-xs text-gray-600 uppercase tracking-wider', className)}
      {...props}
    />
  );
}
