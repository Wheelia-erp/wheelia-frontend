'use client';

import AppShell from '@/components/layout/AppShell';
import CustomerTable from '@/components/customers/CustomerTable';
import { CustomerFormWrapper } from '@/components/customers/CustomerFormWrapper';
import { CustomerFormValues } from '@/components/customers/CustomerForm';
import { useCrud } from '@/hooks/crud/useCrud';
import { toast } from 'sonner';
import { Customer } from '@/modules/customers/customer.types';
import { useApiErrorToast } from '@/hooks/crud/useApiErrorToast';

export default function CustomersPage() {
  const {
    items: customers,
    itemBeingEdited,
    isViewing,
    isFormOpen,
    loading,
    page,
    pageSize,
    totalItems,
    hasNextPage,
    hasPreviousPage,
    setPage,
    setPageSize,
    nextPage,
    previousPage,
    openForm,
    view,
    cancelForm,
    create,
    update,
    remove,
    changeStatus,
  } = useCrud<Customer>({ endpoint: '/customers' });

  const { show: showError } = useApiErrorToast();

  const handleSubmit = async (data: CustomerFormValues) => {
    try {
      if (itemBeingEdited) {
        await update((itemBeingEdited as any).id, data);
        toast.success('Cliente atualizado com sucesso!');
      } else {
        await create(data);
        toast.success('Cliente criado com sucesso!');
      }
      cancelForm();
    } catch (err) {
      showError(err);
    }
  };

  const handleDelete = async (customer: Customer) => {
    try {
      await remove((customer as any).id);
      toast.success('Cliente excluído com sucesso!');
    } catch (err) {
      showError(err);
    }
  };

  const handleStatusChange = async (customer: Customer) => {
    try {
      const status = !customer.isActive;
      await changeStatus((customer as any).id, status);
      toast.success('Status do cliente alterado com sucesso!');
    } catch (err) {
      showError(err);
    }
  };

  const handleEdit = (customer: Customer) => {
    view(customer);
  };

  return (
    <AppShell>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Clientes</h1>
          {!isFormOpen && (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => openForm()}
            >
              Novo Cliente
            </button>
          )}
        </div>

        {isFormOpen ? (
          <CustomerFormWrapper
            title={itemBeingEdited ? 'Editar Cliente' : 'Novo Cliente'}
            defaultValues={itemBeingEdited ?? undefined}
            isEditing={!!isViewing && !!itemBeingEdited}
            readOnly={isViewing}
            onSubmit={handleSubmit}
            onCancel={cancelForm}
            loading={loading}
          />
        ) : (
          <CustomerTable
            customers={customers}
            loading={loading}
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            onNextPage={nextPage}
            onPreviousPage={previousPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
            onEdit={handleEdit}
            onView={view}
            onDelete={handleDelete}
            onChangeStatus={handleStatusChange}
          />
        )}
      </div>
    </AppShell>
  );
}
