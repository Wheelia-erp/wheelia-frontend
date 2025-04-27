'use client';

import { useEffect, useState, useCallback } from 'react';
import backendApi from '@/lib/backendApi'; // ou onde estiver seu serviço de API

interface UseCrudOptions {
  endpoint: string;
}

export function useCrud<T>({ endpoint }: UseCrudOptions) {
  const [items, setItems] = useState<T[]>([]);
  const [itemBeingEdited, setItemBeingEdited] = useState<T | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 Paginação controlada internamente
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / pageSize);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const nextPage = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };

  const previousPage = () => {
    if (hasPreviousPage) setPage((prev) => prev - 1);
  };

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await backendApi.get(endpoint, {
        params: {
          page,
          pageSize,
        },
      });
      if (Array.isArray(data)) {
        setItems(data);
        setTotalItems(data.length); // Como a API não manda total, assume o próprio tamanho
      } else {
        setItems(data.items ?? []);
        setTotalItems(data.total ?? 0);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, page, pageSize]);

  async function create(data: Partial<T>) {
    await backendApi.post(endpoint, data);
    await reload();
  }

  async function update(id: string, data: Partial<T>) {
    await backendApi.put(`${endpoint}/${id}`, data);
    await reload();
  }

  async function remove(id: string) {
    await backendApi.delete(`${endpoint}/${id}`);
    await reload();
  }

  async function changeStatus(id: string, isActive: boolean) {
    await backendApi.patch(`${endpoint}/${id}/status`, { isActive });
    await reload();
  }

  function openForm(item?: T) {
    if (item) {
      setItemBeingEdited(item);
    } else {
      setItemBeingEdited(null);
    }
    setIsViewing(false);
    setIsFormOpen(true);
  }

  function view(item: T) {
    setItemBeingEdited(item);
    setIsViewing(true);
    setIsFormOpen(true);
  }

  function cancelForm() {
    setIsFormOpen(false);
    setItemBeingEdited(null);
    setIsViewing(false);
  }

  // 🔥 Auto reload ao mudar page ou pageSize
  useEffect(() => {
    reload();
  }, [reload]);

  return {
    items,
    itemBeingEdited,
    isFormOpen,
    isViewing,
    loading,
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    setPage,
    setPageSize,
    nextPage,
    previousPage,
    openForm,
    view,
    cancelForm,
    create,
    update,
    remove,
    changeStatus,
    reload,
  };
}
