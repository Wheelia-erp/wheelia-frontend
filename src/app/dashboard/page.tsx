'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardPage() {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [users, setUsers] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoadingData(true);
      const token = await getAccessTokenSilently();
      const res = await axios.get('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
    } finally {
      setLoadingData(false);
    }
  };

  if (isLoading) return <p>Carregando autenticação...</p>;
  if (!isAuthenticated)
    return (
      <div className="p-6">
        <p>Você não está autenticado.</p>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Fazer login
        </button>
      </div>
    );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Bem-vindo, {user?.email}</h1>

      <button
        onClick={fetchUsers}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Buscar usuários
      </button>

      {loadingData && <p>Carregando usuários...</p>}

      {users.length > 0 && (
        <pre className="bg-gray-100 p-4 rounded text-sm">
          {JSON.stringify(users, null, 2)}
        </pre>
      )}

      <button
        onClick={() => logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          })}
        className="text-red-600 underline"
      >
        Sair
      </button>
    </div>
  );
}
