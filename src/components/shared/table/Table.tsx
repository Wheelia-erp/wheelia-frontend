'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { PaginationToolbar } from '@/components/shared/table/PaginationToolbar';

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  loading?: boolean;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  // eslint-disable-next-line no-unused-vars
  onPageSizeChange?: (size: number) => void;
}

export default function Table({
  className,
  children,
  // eslint-disable-next-line no-unused-vars
  loading,
  page,
  pageSize,
  totalItems,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  onPageSizeChange,
  ...props
}: TableProps) {
  const showPagination =
    totalItems !== undefined &&
    page !== undefined &&
    pageSize !== undefined &&
    hasNextPage !== undefined &&
    hasPreviousPage !== undefined &&
    onNextPage !== undefined &&
    onPreviousPage !== undefined &&
    onPageSizeChange !== undefined;

  return (
    <div className="w-full overflow-x-auto bg-white border rounded-md">
      <table className={cn('w-full text-sm text-left', className)} {...props}>
        {children}
      </table>

      {showPagination && (
        <PaginationToolbar
          page={page!}
          pageSize={pageSize!}
          totalItems={totalItems!}
          onPageChange={(newPage) => {
            if (newPage > page!) {
              onNextPage?.();
            } else {
              onPreviousPage?.();
            }
          }}
          onPageSizeChange={onPageSizeChange!}
        />
      )}
    </div>
  );
}
