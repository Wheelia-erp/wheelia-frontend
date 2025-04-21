import AppShell from '@/components/layout/AppShell';
import StatCard from '@/components/dashboard/StatCard';

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Monthly Recurring Revenue" value="$2.500" />
          <StatCard title="Active Subscriptions" value="48" />
          <StatCard title="New Customers" value="5" />
          <StatCard title="Payments Received" value="$1.200" />
        </div>

        <div>
          <h2 className="text-lg font-semibold mt-6">Recent Activity</h2>
          <div className="border-t mt-2 pt-4 text-sm text-gray-500">
            Nenhuma atividade recente.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
