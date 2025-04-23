'use client';

import { useState } from 'react';
import TableRow from '@/components/shared/table/TableRow';
import TableCell from '@/components/shared/table/TableCell';
import { User } from '@/modules/users/user.types';
import { cn } from '@/lib/utils';
import { RowActions } from '../shared/table/RowActions';
import { ConfirmDeleteDialog } from '@/components/shared/dialogs/ConfirmDeleteDialog';

export default function UserRow({   
  user,
  onEdit, 
  onView,
  onDelete,
}: { 
  user: User,
  // eslint-disable-next-line no-unused-vars
  onEdit: (user: User) => void, 
  // eslint-disable-next-line no-unused-vars
  onView: (user: User) => void,
  // eslint-disable-next-line no-unused-vars
  onDelete: (user: User) => void,
}) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(true);
    onView(user);
    onDelete(user);
    console.log('Visualizar usuário', user.id);
  };

  return (
    <TableRow
      onClick={handleClick}
      className={cn(
        'cursor-pointer hover:bg-blue-50 transition',
        selected && 'bg-blue-100'
      )}
    >
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <span
          className={cn(
            'inline-block px-2 py-1 text-xs rounded-full font-medium',
            user.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-700'
          )}
        >
          {user.isActive ? 'Ativo' : 'Inativo'}
        </span>
      </TableCell>
      <TableCell align="right">
        <RowActions>
          <button 
            className="w-full px-3 py-2 rounded-md hover:bg-gray-50 text-left"             
            onClick={(e) => {
                e.stopPropagation();
                onEdit(user);
              }
            }>
            Editar
          </button>
          <ConfirmDeleteDialog
            onConfirm={() => onDelete(user)}
            trigger={
              <button
                className="w-full px-3 py-2 rounded-md hover:bg-red-50 text-left text-red-600"
                onClick={(e) => e.stopPropagation()}
              >
                Excluir
              </button>
            }
            title="Excluir usuário"
            description={`Tem certeza que deseja excluir ${user.name}?\nEsta ação não poderá ser desfeita.`}
          />
        </RowActions>
      </TableCell>
    </TableRow>
  );
}
