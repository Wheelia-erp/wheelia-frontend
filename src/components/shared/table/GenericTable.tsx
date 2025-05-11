import { ReactNode } from 'react';
import Table from '@/components/shared/table/Table';
import TableHead from '@/components/shared/table/TableHead';
import TableBody from '@/components/shared/table/TableBody';
import TableHeader from '@/components/shared/table/TableHeader';
import TableRow from '@/components/shared/table/TableRow';
import TableCell from '@/components/shared/table/TableCell';
import { cn } from '@/lib/utils';
import TableEmpty from './TableEmpty';

interface Column<T> {
  label: string;
  field: keyof T;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  format?: (value: any) => ReactNode;  
}

interface GenericTableProps<T> {
  selected: boolean;
  columns: Column<T>[];
  data: T[];
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
  // eslint-disable-next-line no-unused-vars
  actions?: (item: T) => ReactNode;
  // eslint-disable-next-line no-unused-vars
  onRowClick?: (item: T) => void;
}

export default function GenericTable<T>(
  { 
    selected,
    columns, 
    data, 
    loading, 
    page,
    pageSize,
    totalItems,
    hasNextPage,
    hasPreviousPage,
    onNextPage,
    onPreviousPage,    
    onPageSizeChange,
    actions, 
    onRowClick 

  }: GenericTableProps<T>) {
  return (
    <Table
      loading={loading}      
      page={page}
      pageSize={pageSize}
      totalItems={totalItems}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
      onPageSizeChange={onPageSizeChange}  
    >
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableHeader key={col.field as string}>{col.label}</TableHeader>
          ))}
          {actions && <TableHeader>Ações</TableHeader>}
        </TableRow>
      </TableHead>

      <TableBody 
        loading={loading} 
        skeletonColumns={columns.length + 1}
        skeletonRows={5}
      >
        <>
        {!data.length && !loading && (
          <TableEmpty />
        )}
        {data.map((item, index) => (
          <TableRow 
            key={index} 
            onClick={() => onRowClick?.(item)} 
            className={cn(
              'cursor-pointer hover:bg-blue-50 transition',
              selected && 'bg-blue-100'
            )}>
            {columns.map((col) => (
              <TableCell key={col.field as string}>
                {col.format
                  ? col.format(item[col.field])
                  : (item[col.field] as ReactNode)}
              </TableCell>
            ))}
            {actions && <TableCell>{actions(item)}</TableCell>}
          </TableRow>
        ))}
        </>
      </TableBody>
    </Table>
  );
}
