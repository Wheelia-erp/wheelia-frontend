'use client';

import AppShell from '@/components/layout/AppShell';
import UserTable from '@/components/users/UserTable';
import { UserFormWrapper } from '@/components/users/UserFormWrapper';
import { FilterValue, useCrud } from '@/hooks/crud/useCrud';
import { toast } from 'sonner';
import { useApiErrorToast } from '@/hooks/crud/useApiErrorToast';
import { useState } from 'react';
import { FilterField, FilterSheetWrapper } from '@/components/shared/forms/FilterSheetWrapper';
import { FormButton } from '@/components/form/FormButton';
import { UserEntity } from './entity/user.entity';
import { UserFormDto } from './dto/user-form.dto';

export default function UsersSettingsPage() {
  const [filters, setFilters] = useState<Record<string, FilterValue>>({});

  const {
    items: users,
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
    onView,
    onEdit,
    cancelForm,    
    create,
    update,
    remove,
    changeStatus,    
  } = useCrud<UserEntity, UserFormDto>({ endpoint: '/users', filters });

  const { show: showError } = useApiErrorToast();

  const handleSubmit = async (data: UserEntity) => {    
    const dataToSave = new UserFormDto(data);
    if (itemBeingEdited)
    try {
      if (itemBeingEdited) {
        await update(itemBeingEdited.id, dataToSave);
        toast.success('Usuário atualizado com sucesso!');
      } else {
        await create(dataToSave);
        toast.success('Usuário criado com sucesso!');
      }
      cancelForm();
    } catch (err) {
      showError(err); 
    }    
  };

  const handleDelete = async (user: UserEntity) => {
    try {
      await remove(user.id);
      toast.success('Usuário excluído com sucesso!');
    } catch (err) {
      console.error(err);
      showError(err); 
    }
  };  

  const handleStatusChange = async (user: UserEntity) => {
    try {      
      await changeStatus(user.id);
      toast.success('Status do usuário alterado com sucesso!');
    } catch (err) {
      showError(err); 
    }
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
                  setPage(1); 
                }}
              />
            )}
            {!isFormOpen && (
              <FormButton onClick={() => openForm()}>
                Novo Usuário
              </FormButton>
            )}
          </div>
        </div>

        {isFormOpen ? (
          <UserFormWrapper
            title='Usuário'
            defaultValues={itemBeingEdited ?? undefined}
            isEditing={isEditing}
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
