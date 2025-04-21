import AppShell from '@/components/layout/AppShell';

export default function TenantSettingsPage() {
  return (
    <AppShell>
      <div className="p-6 space-y-4 max-w-xl">
        <h1 className="text-2xl font-bold">Dados da Empresa</h1>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input type="text" className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Documento (CNPJ/CPF)</label>
            <input type="text" className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2" />
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
        </form>
      </div>
    </AppShell>
  );
}
