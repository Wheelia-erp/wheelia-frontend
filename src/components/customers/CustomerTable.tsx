'use client';

import Table from '@/components/shared/table/Table';
import TableHead from '@/components/shared/table/TableHead';
import TableBody from '@/components/shared/table/TableBody';
import TableHeader from '@/components/shared/table/TableHeader';
import { CustomerRow } from './CustomerRow';
import CustomerTableEmpty from './CustomerTableEmpty';
import TableHeaderRow from '../shared/table/TableHarderRow';
import { CustomerEntity } from '@/app/customers/entity/customer.entity';

interface CustomerTableProps {
  customers: CustomerEntity[];
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
  onEdit: (customer: CustomerEntity) => void;
  // eslint-disable-next-line no-unused-vars
  onView: (customer: CustomerEntity) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (customer: CustomerEntity) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeStatus: (customer: CustomerEntity) => void;
}

export default function CustomerTable({
  customers,
  loading,
  page,
  pageSize,
  totalItems, 
  hasNextPage,  
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
          <TableHeaderRow>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Documento</TableHeader>
            <TableHeader>Telefone</TableHeader>
            <TableHeader>E-mail</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader align="center">Ações</TableHeader>
          </TableHeaderRow>
        </TableHead>

        <TableBody loading={loading} skeletonRows={5} skeletonColumns={5}>
        {!loading && (
          <>
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
          </>
        )}
        </TableBody>
      </Table>

  );
}
