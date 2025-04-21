import TableRow from './TableRow';
import TableCell from './TableCell';

export default function TableEmptyState({ colSpan = 1 }: { colSpan?: number }) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={colSpan}>
        <span className="text-gray-500 text-sm">Nenhum dado encontrado.</span>
      </TableCell>
    </TableRow>
  );
}
