export default function StatCard({ title, value }: { title: string; value: string | number }) {
    return (
      <div className="border rounded-lg p-4 shadow-sm">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    );
  }
  