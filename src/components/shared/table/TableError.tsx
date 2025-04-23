export default function TableError({
    message = 'Erro ao carregar os dados.',
    colSpan = 4,
  }: {
    message?: string;
    colSpan?: number;
  }) {
    return (
      <tr>
        <td colSpan={colSpan} className="text-center px-6 py-10 text-red-500 text-sm">
          {message}
        </td>
      </tr>
    );
  }
  