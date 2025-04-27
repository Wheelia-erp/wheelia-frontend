'use client';

import { ReactNode } from 'react';

interface TableFooterProps {
  totalItems: number;
  page: number;
  pageSize: number;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  children?: ReactNode; 
}

export function TableFooter({
  totalItems,
  page,
  pageSize,
  onNextPage,
  onPreviousPage,
  hasNextPage,
  hasPreviousPage,
  children,
}: TableFooterProps) {
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t bg-white text-sm text-gray-600">
      <div>        
        {totalItems > 0
          ? `Mostrando ${startItem}-${endItem} de ${totalItems} registros`
          : 'Nenhum registro encontrado'}
      </div>

      <div className="flex items-center gap-2">
        {hasPreviousPage && (
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100"
            onClick={onPreviousPage}
          >
            Anterior
          </button>
        )}
        {hasNextPage && (
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100"
            onClick={onNextPage}
          >
            Próximo
          </button>
        )}
      </div>

      {children}
    </div>
  );
}
