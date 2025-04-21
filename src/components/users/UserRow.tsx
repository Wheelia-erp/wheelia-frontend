'use client';

import TableRow from '@/components/shared/table/TableRow';
import TableCell from '@/components/shared/table/TableCell';
import { User } from '@/modules/users/user.types';

export default function UserRow({ user }: { user: User }) {
  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.isActive ? 'Ativo' : 'Inativo'}</TableCell>
      <TableCell align="right">
        <button className="text-blue-600 text-sm hover:underline mr-2">
          Editar
        </button>
        <button className="text-red-600 text-sm hover:underline">
          Excluir
        </button>
      </TableCell>
    </TableRow>
  );
}
