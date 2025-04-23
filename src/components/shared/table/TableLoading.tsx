export default function UserTableLoading({ colSpan = 4 }: { colSpan?: number }) {
    return (
      <tr>
        <td colSpan={colSpan} className="text-center px-6 py-10 text-gray-500 text-sm animate-pulse">
          Carregando usuários...
        </td>
      </tr>
    );
  }
  