'use client';

import { useEffect, useState } from 'react';
import Table from '@/components/shared/table/Table';
import TableHeader from '@/components/shared/table/TableHeader';
import TableBody from '@/components/shared/table/TableBody';
import TableEmptyState from '@/components/shared/table/TableEmptyState';
import UserRow from '@/components/users/UserRow';
import { User } from '@/modules/users/user.types';
import backendApi  from "@/lib/backendApi";

export default function UserTable() {  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        console.log('backendApi.getUri()', backendApi.getUri());
        const response = await backendApi.get<User[]>('/users');
        const { data } = response;
        console.log('response.config', response.config);
        setUsers(data);
      } catch (err) {
        console.error('Erro ao carregar usuários:', err);
        setError('Erro ao carregar usuários');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div>
    <Table>
      <TableHeader headers={['Nome', 'Email', 'Status', 'Ações']} />
      <TableBody>
        {loading && (
          <tr>
            <td colSpan={4} className="text-center p-4 text-sm text-gray-500">
              Carregando...
            </td>
          </tr>
        )}

        {error && (
          <tr>
            <td colSpan={4} className="text-center p-4 text-sm text-red-500">
              {error}
            </td>
          </tr>
        )}

        {!loading && !error && users.length === 0 && (
          <TableEmptyState colSpan={4} />
        )}

        {!loading &&
          users.map((user) => <UserRow key={user.id} user={user} />)}
      </TableBody>
    </Table>    
    </div>
  );
}
