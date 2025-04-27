'use client';

import { useState } from 'react';
import { Customer } from '@/modules/customers/customer.types';
import TableRow from '@/components/shared/table/TableRow';
import TableCell from '@/components/shared/table/TableCell';
import { cn } from '@/lib/utils';
import { RowActions } from '@/components/shared/table/RowActions';
import { ConfirmDeleteDialog } from '@/components/shared/dialogs/ConfirmDeleteDialog';



export function CustomerRow({
  customer,
  onEdit,
  onView,
  onDelete,
  onChangeStatus,
}: {
  customer: Customer;
  // eslint-disable-next-line no-unused-vars
  onEdit: (customer: Customer) => void;
  // eslint-disable-next-line no-unused-vars
  onView: (customer: Customer) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (customer: Customer) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeStatus: (customer: Customer) => void;

}) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(true);
    onView(customer);
  };

  return (
    <TableRow
      onClick={handleClick}
      className={cn(
        'cursor-pointer hover:bg-blue-50 transition',
        selected && 'bg-blue-100'
      )}
    >
      <TableCell>{customer.name}</TableCell>
      <TableCell>{customer.document}</TableCell>
      <TableCell>{customer.phone ?? customer.mobile}</TableCell>
      <TableCell>{customer.email}</TableCell>
      <TableCell>
              <span
                className={cn(
                  'inline-block px-2 py-1 text-xs rounded-full font-medium',
                  customer.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-700'
                )}
              >
                {customer.isActive ? 'Ativo' : 'Inativo'}
              </span>
            </TableCell>
      <TableCell align="right">
        <RowActions>
          <button 
            className="w-full px-3 py-2 rounded-md hover:bg-gray-50 text-left"
            onClick={(e) => {
              e.stopPropagation();
              onChangeStatus(customer);
            }}
          >
            {customer.isActive ? 'Desativar' : 'Ativar'}
          </button>

          <button 
            className="w-full px-3 py-2 rounded-md hover:bg-gray-50 text-left"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(customer);
            }}
          >
            Editar
          </button>

          <ConfirmDeleteDialog
            onConfirm={() => onDelete(customer)}
            trigger={
              <button
                className="w-full px-3 py-2 rounded-md hover:bg-red-50 text-left text-red-600"
                onClick={(e) => e.stopPropagation()}
              >
                Excluir
              </button>
            }
            title="Excluir cliente"
            description={`Tem certeza que deseja excluir ${customer.name}?\nEsta ação não poderá ser desfeita.`}
          />
        </RowActions>
      </TableCell>
    </TableRow>
  );
}
