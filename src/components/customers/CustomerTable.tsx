'use client';

import { Customer } from '@/modules/customers/customer.types';
import Table from '@/components/shared/table/Table';
import TableHead from '@/components/shared/table/TableHead';
import TableBody from '@/components/shared/table/TableBody';
import TableHeader from '@/components/shared/table/TableHeader';
import { CustomerRow } from './CustomerRow';
import CustomerTableEmpty from './CustomerTableEmpty';
import { PaginationToolbar } from '@/components/shared/table/PaginationToolbar';
import TableHeaderRow from '../shared/table/TableHarderRow';

interface CustomerTableProps {
  customers: Customer[];
  loading?: boolean;
  page: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  // eslint-disable-next-line no-unused-vars
  onPageSizeChange: (size: number) => void;
  // eslint-disable-next-line no-unused-vars
  onEdit: (customer: Customer) => void;
  // eslint-disable-next-line no-unused-vars
  onView: (customer: Customer) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (customer: Customer) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeStatus: (customer: Customer) => void;
}

export default function CustomerTable({
  customers,
  loading,
  page,
  pageSize,
  totalItems,
  // eslint-disable-next-line no-unused-vars
  hasNextPage,
  // eslint-disable-next-line no-unused-vars
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  onPageSizeChange,
  onEdit,
  onView,
  onDelete,
  onChangeStatus,
}: CustomerTableProps) {
  return (
    <div className="w-full overflow-x-auto bg-white border rounded-md">
      <Table>
        <TableHead>
          <TableHeaderRow>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Documento</TableHeader>
            <TableHeader>Telefone</TableHeader>
            <TableHeader>E-mail</TableHeader>
            <TableHeader align="center">Ações</TableHeader>
          </TableHeaderRow>
        </TableHead>

        <TableBody loading={loading} skeletonRows={5} skeletonColumns={5}>
          {customers.length === 0 ? (
            <CustomerTableEmpty />
          ) : (
            customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                onEdit={onEdit}
                onView={onView}
                onDelete={onDelete}
                onChangeStatus={onChangeStatus}
              />
            ))
          )}
        </TableBody>
      </Table>

      {/* PaginationToolbar já acoplado no fim da tabela */}
      <PaginationToolbar
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={(newPage) => {
          if (newPage > page) onNextPage();
          else onPreviousPage();
        }}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
