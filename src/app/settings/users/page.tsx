import AppShell from '@/components/layout/AppShell';

export default function UsersSettingsPage() {
  return (
    <AppShell>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Usuários</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Novo Usuário</button>
        </div>

        <div className="text-sm text-gray-500">Nenhum usuário cadastrado ainda.</div>
      </div>
    </AppShell>
  );
}
