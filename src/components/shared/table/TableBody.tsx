'use client';

import { HTMLAttributes } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  loading?: boolean;
  skeletonRows?: number;
  skeletonColumns?: number;
}

export default function TableBody({
  loading = false,
  skeletonRows = 5,
  skeletonColumns = 3,
  children,
  ...props
}: TableBodyProps) {
  if (loading) {
    return (
      <tbody {...props}>
        {Array.from({ length: skeletonRows }).map((_, rowIndex) => (
          <tr key={rowIndex} className="animate-pulse">
            {Array.from({ length: skeletonColumns }).map((_, colIndex) => (
              <td key={colIndex} className="px-4 py-3">
                <Skeleton className="h-4 w-full" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  return <tbody {...props}>{children}</tbody>;
}
