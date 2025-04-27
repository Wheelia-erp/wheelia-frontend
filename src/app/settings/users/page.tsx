'use client';

import AppShell from '@/components/layout/AppShell';
import UserTable from '@/components/users/UserTable';
import { UserFormWrapper } from '@/components/users/UserFormWrapper';
import { UserFormValues } from '@/components/users/UserForm';
import { useCrud } from '@/hooks/crud/useCrud';
import { toast } from 'sonner';
import { User } from '@/modules/users/user.types';
import { useApiErrorToast } from '@/hooks/crud/useApiErrorToast';

import { useState } from 'react';
import { FilterField, FilterSheetWrapper } from '@/components/shared/forms/FilterSheetWrapper';
import { FormButton } from '@/components/form/FormButton';

export default function UsersSettingsPage() {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const {
    items: users,
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
  } = useCrud<User>({ endpoint: '/users', filters });

  const { show: showError } = useApiErrorToast();

  const handleSubmit = async (data: UserFormValues) => {
    try {
      if (itemBeingEdited) {
        await update(itemBeingEdited.id, data);
        toast.success('Usuário atualizado com sucesso!');
      } else {
        await create(data);
        toast.success('Usuário criado com sucesso!');
      }
      cancelForm();
    } catch (err) {
      showError(err); 
    }
  };

  const handleDelete = async (user: User) => {
    try {
      await remove(user.id);
      toast.success('Usuário excluído com sucesso!');
    } catch (err) {
      console.error(err);
      showError(err); 
    }
  };  

  const handleStatusChange = async (user: User) => {
    try {      
      await changeStatus(user.id, 'isActive');
      toast.success('Status do usuário alterado com sucesso!');
    } catch (err) {
      showError(err); 
    }
  };

  const handleEdit = (user: User) => {
    view(user);
  };

  const filterFields: FilterField[] = [
    { name: 'name', label: 'Nome', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'isActive', label: 'Ativo', type: 'boolean' },
    { name: 'role', label: 'Perfil', type: 'text' },
  ];

  return (
    <AppShell>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Usuários</h1>
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
                Novo Usuário
              </FormButton>
            )}
          </div>
        </div>

        {isFormOpen ? (
          <UserFormWrapper
            title={itemBeingEdited ? 'Editar Usuário' : 'Novo Usuário'}
            defaultValues={itemBeingEdited ?? undefined}
            isEditing={!!isViewing && !!itemBeingEdited}
            readOnly={isViewing}
            onSubmit={handleSubmit}
            onCancel={cancelForm}            
            loading={loading}
          />
        ) : (
          <UserTable
            users={users ?? []}
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
