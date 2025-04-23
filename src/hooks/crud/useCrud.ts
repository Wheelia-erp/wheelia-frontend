import { useEffect, useState } from 'react';
import backendApi from '@/lib/backendApi';

// eslint-disable-next-line no-unused-vars
interface UseCrudOptions<T> {
  endpoint: string;
}

export function useCrud<T extends { id: string | number }>({ endpoint }: UseCrudOptions<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [itemBeingEdited, setItemBeingEdited] = useState<T | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isViewing, setViewing] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await backendApi.get<T[]>(endpoint, { withCredentials: true });
      setItems(res.data);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar os dados');
    } finally {
      setLoading(false);
    }
  };

  const create = async (data: Partial<T>) => {
    try {
      const res = await backendApi.post<T>(endpoint, data, { withCredentials: true });
      setItems((prev) => [...prev, res.data]);
      return res.data;
    } catch (err: any) {
      throw formatCrudError(err);
    }
  };

  const update = async (id: T['id'], data: Partial<T>) => {
    
    try {
    const res = await backendApi.put<T>(`${endpoint}/${id}`, data, { withCredentials: true });
    setItems((prev) => prev.map((item) => (item.id === id ? res.data : item)));
    } catch (err: any) {
      throw formatCrudError(err);
    }
  };

  const view = (item: T) => {
    setItemBeingEdited(item);
    setFormOpen(true);
    setViewing(true);
  }; 

  const remove = async (id: T['id']) => {
    await backendApi.delete(`${endpoint}/${id}`, { withCredentials: true });
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const openForm = (item?: T) => {
    setItemBeingEdited(item ?? null);
    setFormOpen(true);
    setViewing(false);
  };

  const cancelForm = () => {
    setItemBeingEdited(null);
    setFormOpen(false);
    setViewing(false);
  };

  function formatCrudError(err: any): Error {
    const status = err?.response?.status;
    const data = err?.response?.data;
  
    if (status === 409) {
      return new Error('Já existe um registro com esse dado.');
    }
  
    // Se backend retornar objeto { message: "..." }
    if (data && typeof data === 'object' && 'message' in data) {
      return new Error((data as any).message);
    }
  
    // Se backend retornar texto simples (ex: "Internal Server Error")
    if (typeof data === 'string') {
      if (status >= 500) {
        return new Error('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
      return new Error(data);
    }
  
    // Qualquer outro erro
    if (status >= 500) {
      return new Error('Ocorreu um erro inesperado no servidor.');
    }
  
    return new Error('Não foi possível processar sua solicitação.');
  }
    
  useEffect(() => {
    load();
  }, []);

  return {
    items,
    itemBeingEdited,
    isFormOpen,
    isViewing,
    loading,
    error,
    openForm,
    view,
    cancelForm,
    create,
    update,
    remove,
    reload: load,
  };
}
