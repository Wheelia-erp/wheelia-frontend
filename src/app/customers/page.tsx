import AppShell from '@/components/layout/AppShell';
import CustomerTable from '@/components/customers/CustomerTable';

export default function CustomersPage() {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Novo Cliente
          </button>
        </div>

        <CustomerTable />
      </div>
    </AppShell>
  );
}
