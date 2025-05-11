'use client';

import { BaseFormDto } from '@/core/dto/base-form.dto';
import { BaseEntity } from '@/core/entity/base.entity';
import backendApi from '@/lib/backendApi';
import { useEffect, useState } from 'react';
import { Primitive } from 'react-hook-form';

export type FilterValue =
  | Primitive
  | Record<string, Primitive>
  | Array<Primitive | Record<string, Primitive>>;

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

interface UseCrudOptions {
  endpoint: string;
  filters?: Record<string, FilterValue>;
}

export function useCrud<
  EntityType extends BaseEntity,
  FormDtoType extends BaseFormDto,
>({ endpoint, filters = {} }: UseCrudOptions) {
  const [items, setItems] = useState<EntityType[]>([]);
  const [loading, setLoading] = useState(false);

  const [itemBeingEdited, setItemBeingEdited] = useState<EntityType | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          if (
            typeof value === 'object' &&
            !Array.isArray(value) &&
            value !== null
          ) {
            Object.entries(value).forEach(([op, opValue]) => {
              params.set(`${key}[${op}]`, String(opValue));
            });
          } else {
            params.set(key, String(value));
          }
        }
      });

      const response = await backendApi.get<{
        items: EntityType[];
        total: number;
      }>(`${endpoint}?${params.toString()}`);

      setItems(response.data.items);
      setTotalItems(response.data.total);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [endpoint, page, pageSize, filters]);

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

  async function loadObject(itemOfList: EntityType) {
    setLoading(true);
    try {
      const response = await backendApi.get<EntityType>(
        `${endpoint}/${itemOfList.id}`
      );
      setItemBeingEdited(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function openForm() {
    setIsFormOpen(true);
    setIsViewing(false);
    setIsEditing(false);
    setItemBeingEdited(null);
  }

  async function onEdit(item: EntityType) {
    await loadObject(item);
    setIsFormOpen(true);
    setIsEditing(true);
    setIsViewing(false);
  }

  async function onView(item: EntityType) {
    await loadObject(item);
    setIsViewing(true);
    setIsFormOpen(true);
  }

  function cancelForm() {
    setIsFormOpen(false);
    setIsViewing(false);
    setItemBeingEdited(null);
  }

  async function create(payload: Partial<FormDtoType>) {
    const response = await backendApi.post<FormDtoType>(endpoint, payload);
    cancelForm();
    fetchData();
    return response.data;
  }

  async function update(id: string, payload: Partial<FormDtoType>) {
    const response = await backendApi.put<FormDtoType>(
      `${endpoint}/${id}`,
      payload
    );
    cancelForm();
    fetchData();
    return response.data;
  }

  async function remove(id: string) {
    await backendApi.delete(`${endpoint}/${id}`);
    fetchData();
  }

  async function changeStatus(id: string) {
    const item = items.find((i) => (i as BaseEntity).id === id) as BaseEntity;
    if (!item) return;

    const updated = { isActive: !item.isActive } as Partial<FormDtoType>;
    await backendApi.patch(`${endpoint}/${id}`, updated);
    fetchData();
  }

  return {
    items,
    itemBeingEdited,
    isViewing,
    isEditing,
    isFormOpen,
    loading,
    page,
    pageSize,
    totalItems,
    hasNextPage,
    hasPreviousPage,
    openForm,
    onView,
    onEdit,
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
    setLoading,
  };
}
