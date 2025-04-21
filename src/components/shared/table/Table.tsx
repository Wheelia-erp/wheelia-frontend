export default function Table({ children }: { children: React.ReactNode }) {
    return (
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full table-auto text-sm">{children}</table>
      </div>
    );
  }
  