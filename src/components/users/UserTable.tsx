'use client';

import { User } from '@/modules/users/user.types';
import Table from '@/components/shared/table/Table';
import TableHead from '@/components/shared/table/TableHead';
import TableBody from '@/components/shared/table/TableBody';
import TableHeader from '@/components/shared/table/TableHeader';
import UserRow from './UserRow';
import UserTableEmpty from '@/components/shared/table/TableEmpty';
import TableHeaderRow from '../shared/table/TableHarderRow';

interface UserTableProps {
  users: User[];
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
  onEdit: (user: User) => void;
  // eslint-disable-next-line no-unused-vars
  onView: (user: User) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (user: User) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeStatus: (user: User) => void;
}

export default function UserTable({
  users,
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
}: UserTableProps) {
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
          <TableHeader>E-mail</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader align="center">Ações</TableHeader>
        </TableHeaderRow>
      </TableHead>

      <TableBody loading={loading} skeletonRows={5} skeletonColumns={4}>
        {!loading && (
          <>
            {(users?.length ?? 0) === 0 ? (
              <UserTableEmpty />
            ) : (
              users?.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
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
