'use client';

import AppShell from '@/components/layout/AppShell';
import CustomerTable from '@/components/customers/CustomerTable';
import { CustomerFormWrapper } from '@/components/customers/CustomerFormWrapper';
import { FilterValue, useCrud } from '@/hooks/crud/useCrud';
import { toast } from 'sonner';
import { useApiErrorToast } from '@/hooks/crud/useApiErrorToast';
import { FilterField, FilterSheetWrapper } from '@/components/shared/forms/FilterSheetWrapper';
import { FormButton } from '@/components/form/FormButton';
import { useState } from 'react';
import { CustomerEntity } from './entity/customer.entity';
import { CustomerFormDto } from './dto/customer-form.dto';

export default function CustomersPage() {
  const [filters, setFilters] = useState<Record<string, FilterValue>>({});
  const {
    items: customers,
    itemBeingEdited,
    isViewing,   
    isEditing, 
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
    cancelForm,
    onView, 
    onEdit,   
    create,
    update,
    remove,
    changeStatus,
  } = useCrud<CustomerEntity, CustomerFormDto>({
    endpoint: "/customers",
    filters,
  });

  const { show: showError } = useApiErrorToast();

  const handleSubmit = async (data: CustomerEntity) => {        
    try {
      const dataToSave = new CustomerFormDto(data);       
      if (itemBeingEdited) {        
        await update(itemBeingEdited.id, dataToSave);
        toast.success('Cliente atualizado com sucesso!');
      } else {
        await create(dataToSave);
        toast.success('Cliente criado com sucesso!');
      }
      cancelForm();
    } catch (err) {
      showError(err);
    }
  };

  const handleDelete = async (customer: CustomerEntity) => {
    try {      
      await remove(customer.id);
      toast.success('Cliente excluído com sucesso!');
    } catch (err) {
      showError(err);
    }
  };

  const handleStatusChange = async (customer: CustomerEntity) => {
    try {         
      await changeStatus(customer.id);
      toast.success('Status do cliente alterado com sucesso!');
    } catch (err) {
      showError(err);
    }
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
                  setPage(1); 
                }}
              />
            )}
            {!isFormOpen && (
              <FormButton onClick={() => openForm()}>
                Novo Cliente
              </FormButton>
            )}
          </div>          
        </div>

        {isFormOpen ? (
          <CustomerFormWrapper
            title='Cliente'
            defaultValues={itemBeingEdited ?? undefined}
            isEditing={isEditing}
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
            onEdit={onEdit}
            onView={onView}
            onDelete={handleDelete}
            onChangeStatus={handleStatusChange}
          />
        )}
      </div>
    </AppShell>
  );
}
