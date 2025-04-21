'use client';

import TableRow from '@/components/shared/table/TableRow';
import TableCell from '@/components/shared/table/TableCell';
import { Customer } from '@/modules/customers/customer.types';

export default function CustomerRow({ customer }: { customer: Customer }) {
  return (
    <TableRow>
      <TableCell>{customer.name}</TableCell>
      <TableCell>{customer.email}</TableCell>
      <TableCell>{customer.status}</TableCell>
      <TableCell align="right">
        <button className="text-blue-600 hover:underline text-sm mr-2">Editar</button>
        <button className="text-red-600 hover:underline text-sm">Excluir</button>
      </TableCell>
    </TableRow>
  );
}
