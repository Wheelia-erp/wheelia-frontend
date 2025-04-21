'use client';

import AppShell from '@/components/layout/AppShell';
import UserTable from '@/components/users/UserTable';
import { UserForm, UserFormValues } from '@/components/users/UserForm';
import { useState } from 'react';
import { toast } from 'sonner';
import backendApi from '@/lib/backendApi';

export default function UsersSettingsPage() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleNew = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);

  const handleSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);
      await backendApi.post('/users', data);
      toast.success('Usuário criado com sucesso!');
      setShowForm(false);
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      toast.error('Erro ao criar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Usuários</h1>
          {!showForm && (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleNew}
            >
              Novo Usuário
            </button>
          )}
        </div>

        {/* Exibe somente o formulário ou a tabela */}
        {showForm ? (
          <div className="bg-white shadow rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Novo Usuário</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
            <UserForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={loading}
            />
          </div>
        ) : (
          <UserTable key={refreshKey} />
        )}
      </div>
    </AppShell>
  );
}
