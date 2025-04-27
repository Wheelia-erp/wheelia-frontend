'use client';

import backendApi from '@/lib/backendApi';
import { useEffect, useState } from 'react';


interface UseCrudOptions {
  endpoint: string;
  filters?: Record<string, any>;
}

export function useCrud<T>({ endpoint, filters = {} }: UseCrudOptions) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const [itemBeingEdited, setItemBeingEdited] = useState<T | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const hasNextPage = page * pageSize < totalItems;
  const hasPreviousPage = page > 1;

  async function fetchData() {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('pageSize', pageSize.toString());

      // 🔥 Inclui os filtros na querystring
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          if (typeof value === 'object' && !Array.isArray(value)) {
            Object.entries(value).forEach(([subKey, subValue]) => {
              params.set(`${key}[${subKey}]`, String(subValue));
            });
          } else {
            params.set(key, String(value));
          }
        }
      });

      const response = await backendApi.get<{ items: T[]; total: number }>(
        `${endpoint}?${params.toString()}`
      );

      setItems(response.data.items);
      setTotalItems(response.data.total);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [endpoint, page, pageSize, filters]); // 🔥 Agora escuta filters também!

  function onNextPage() {
    if (hasNextPage) setPage((prev) => prev + 1);
  }

  function onPreviousPage() {
    if (hasPreviousPage) setPage((prev) => prev - 1);
  }

  function onPageSizeChange(size: number) {
    setPageSize(size);
    setPage(1);
  }

  function openForm() {
    setIsFormOpen(true);
    setIsViewing(false);
    setItemBeingEdited(null);
  }

  function view(item: T) {
    setItemBeingEdited(item);
    setIsViewing(true);
    setIsFormOpen(true);
  }

  function cancelForm() {
    setIsFormOpen(false);
    setIsViewing(false);
    setItemBeingEdited(null);
  }

  async function create(payload: Partial<T>) {
    const response = await backendApi.post<T>(endpoint, payload);
    cancelForm();
    fetchData();
    return response.data;
  }

  async function update(id: string, payload: Partial<T>) {
    const response = await backendApi.put<T>(`${endpoint}/${id}`, payload);
    cancelForm();
    fetchData();
    return response.data;
  }

  async function remove(id: string) {
    await backendApi.delete(`${endpoint}/${id}`);
    fetchData();
  }

  async function changeStatus(id: string, statusField: keyof T = 'isActive' as keyof T) {
    const item = items.find((i) => (i as any).id === id);
    if (!item) return;

    const updated = { [statusField]: !(item as any)[statusField] };
    await backendApi.patch(`${endpoint}/${id}`, updated);
    fetchData();
  }

  return {
    items,
    itemBeingEdited,
    isViewing,
    isFormOpen,
    loading,
    page,
    pageSize,
    totalItems,
    hasNextPage,
    hasPreviousPage,
    openForm,
    view,
    cancelForm,
    create,
    update,
    remove,
    changeStatus,
    onNextPage,
    onPreviousPage,
    onPageSizeChange,
    setPage,
    setPageSize,
  };
}
