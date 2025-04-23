import useSWR from 'swr';
import backendApi from '@/lib/backendApi';

export function useCurrentUser() {
  const { data, error, isLoading } = useSWR('/auth/profile', (url) =>
    backendApi.get(url, { withCredentials: true }).then((res) => res.data)
  );

  return {
    user: data,
    isLoading,
    isError: !!error,
  };
}
