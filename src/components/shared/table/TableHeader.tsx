export default function TableHeader({ headers }: { headers: string[] }) {
    return (
      <thead className="bg-gray-100 text-left text-gray-700">
        <tr>
          {headers.map((h) => (
            <th key={h} className="p-3">{h}</th>
          ))}
        </tr>
      </thead>
    );
  }
  