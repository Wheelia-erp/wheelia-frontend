import TableLoading from './TableLoading';
import TableError from './TableError';
import TableEmpty from './TableEmpty';


interface TableStatusManagerProps<T> {
  loading: boolean;
  error: string | null;
  data: T[];
  colSpan?: number;
  children: React.ReactNode;
}

export function TableStatusManager<T>({
  loading,
  error,
  data,
  colSpan = 4,
  children,
}: TableStatusManagerProps<T>) {
  if (loading) return <TableLoading colSpan={colSpan} />;
  if (error) return <TableError message={error} colSpan={colSpan} />;
  if (data.length === 0) return <TableEmpty colSpan={colSpan} />;

  return <>{children}</>;
}
