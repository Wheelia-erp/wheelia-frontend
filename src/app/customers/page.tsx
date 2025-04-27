'use client';

import AppShell from '@/components/layout/AppShell';
import CustomerTable from '@/components/customers/CustomerTable';
import { CustomerFormWrapper } from '@/components/customers/CustomerFormWrapper';
import { CustomerFormValues } from '@/components/customers/CustomerForm';
import { useCrud } from '@/hooks/crud/useCrud';
import { toast } from 'sonner';
import { Customer } from '@/modules/customers/customer.types';
import { useApiErrorToast } from '@/hooks/crud/useApiErrorToast';
import { FilterField, FilterSheetWrapper } from '@/components/shared/forms/FilterSheetWrapper';
import { FormButton } from '@/components/form/FormButton';
import { useState } from 'react';

export default function CustomersPage() {
  const [filters, setFilters] = useState<Record<string, any>>({});
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
    onNextPage,
    onPreviousPage,
    openForm,
    view,
    cancelForm,
    create,
    update,
    remove,
    changeStatus,
  } = useCrud<Customer>({ endpoint: '/customers', filters });

  const { show: showError } = useApiErrorToast();

  const handleSubmit = async (data: CustomerFormValues) => {
    try {
      if (itemBeingEdited) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await remove((customer as any).id);
      toast.success('Cliente excluído com sucesso!');
    } catch (err) {
      showError(err);
    }
  };

  const handleStatusChange = async (customer: Customer) => {
    try {
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await changeStatus((customer as any).id, 'isActive');
      toast.success('Status do cliente alterado com sucesso!');
    } catch (err) {
      showError(err);
    }
  };

  const handleEdit = (customer: Customer) => {
    view(customer);
  };

    const filterFields: FilterField[] = [
      { name: 'name', label: 'Nome', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'isActive', label: 'Ativo', type: 'boolean' },      
    ];

  return (
    <AppShell>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <div className="flex gap-2">
            {!isFormOpen && (
              <FilterSheetWrapper
                fields={filterFields}
                filters={filters}
                onChange={(newFilters) => {
                  setFilters(newFilters);
                  setPage(1); // Resetar para primeira página ao aplicar filtro
                }}
              />
            )}
            {!isFormOpen && (
              <FormButton                
                onClick={() => openForm()}
              >
                Novo Cliente
              </FormButton>
            )}
          </div>          
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
            customers={customers ?? []}
            loading={loading}
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
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
