import AppShell from '@/components/layout/AppShell';
import UnderConstruction from '@/components/layout/UnderConstruction';

export default function ProposalsPage() {
  return (
    <AppShell>
      <div className="p-6 space-y-4 max-w-xl">
        <h1 className="text-2xl font-bold">Notas fiscais</h1>

        <UnderConstruction />;
        
      </div>
    </AppShell>
  );
}
