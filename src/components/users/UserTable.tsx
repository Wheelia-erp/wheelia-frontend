'use client';

import { User } from '@/modules/users/user.types';
import Table from '@/components/shared/table/Table';
import TableHead from '@/components/shared/table/TableHead';
import TableBody from '@/components/shared/table/TableBody';
import TableHeader from '@/components/shared/table/TableHeader';
import UserRow from './UserRow';
import UserTableEmpty from '@/components/shared/table/TableEmpty';
import TableHeaderRow from '../shared/table/TableHarderRow';

interface Props {
  users: User[];
  // eslint-disable-next-line no-unused-vars
  onEdit: (user: User) => void;
  // eslint-disable-next-line no-unused-vars
  onView: (user: User) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (user: User) => void;
}

export default function UserTable({ users, onEdit, onView, onDelete }: Props) {
  return (
    <Table>
      <TableHead>
        <TableHeaderRow>
          <TableHeader>Nome</TableHeader>
          <TableHeader>E-mail</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader align="right">Ações</TableHeader>
        </TableHeaderRow>
      </TableHead>
      <TableBody>
        {users.length === 0 ? (
          <UserTableEmpty />
        ) : (
          users.map((user) => (
            <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} onView={onView} />
          ))
        )}
      </TableBody>
    </Table>
  );
}
