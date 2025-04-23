import Table from '@/components/shared/table/Table';
import TableHeader from '@/components/shared/table/TableHeader';
import TableBody from '@/components/shared/table/TableBody';
import TableEmptyState from '@/components/shared/table/TableEmpty';
import CustomerRow from '@/components/customers/CustomerRow';
import { Customer } from '@/modules/customers/customer.types';

const customers: Customer[] = []; 

export default function CustomerTable() {
  return (
    <Table>
      <TableHeader headers={['Nome', 'E-mail', 'Status', 'Ações']} />
      <TableBody>
        {customers.length > 0 ? (
          customers.map((c) => <CustomerRow key={c.id} customer={c} />)
        ) : (
          <TableEmptyState colSpan={4} />
        )}
      </TableBody>
    </Table>
  );
}
