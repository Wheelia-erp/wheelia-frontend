'use client';

import { useCallback, useState } from 'react';

interface UsePaginationOptions {
  totalItems: number;
  initialPageSize?: number;
}

export function usePagination({ totalItems, initialPageSize = 10 }: UsePaginationOptions) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(totalItems / pageSize);

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setPage((prev) => prev - 1);
    }
  }, [hasPreviousPage]);

  const changePageSize = useCallback((size: number) => {
    setPageSize(size);
    setPage(1); // resetar para página 1 ao trocar tamanho
  }, []);

  return {
    page,
    pageSize,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    changePageSize,
    setPage,
    setPageSize,
  };
}
