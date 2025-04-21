export default function TableRow({ children }: { children: React.ReactNode }) {
    return (
      <tr className="border-t hover:bg-gray-50 transition">{children}</tr>
    );
  }
  