import { toast } from 'sonner';
import { AxiosError } from 'axios';

export function useApiErrorToast() {
  function show(err: unknown, fallbackMessage = 'Erro inesperado.') {
    const message = extractErrorMessage(err) ?? fallbackMessage;
    toast.error(message);
  }

  return { show };
}

function extractErrorMessage(err: unknown): string | null {
  if (!err) return null;

  if (err instanceof Error) {
    return err.message;
  }

  if ((err as AxiosError).response?.data) {
    const data = (err as AxiosError).response!.data;

    if (typeof data === 'string') return data;

    if (data && typeof data === 'object' && 'message' in data) {
      const message = (data as { message: string }).message;
      return typeof message === 'string' ? message : null;
    }
  }

  return null;
}
