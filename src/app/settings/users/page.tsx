'use client';

import AppShell from '@/components/layout/AppShell';
import UserTable from '@/components/users/UserTable';
import { UserFormWrapper } from '@/components/users/UserFormWrapper';
import { UserFormValues } from '@/components/users/UserForm';
import { useCrud } from '@/hooks/crud/useCrud';
import { toast } from 'sonner';
import { User } from '@/modules/users/user.types';
import { useApiErrorToast } from '@/hooks/crud/useApiErrorToast';

export default function UsersSettingsPage() {
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
    nextPage,
    previousPage,
    openForm,
    view,
    cancelForm,    
    create,
    update,
    remove,
    changeStatus,
  } = useCrud<User>({ endpoint: '/users' });

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
      const status = !user.isActive;
      await changeStatus(user.id, status);
      toast.success('Status do usuário alterado com sucesso!');
    } catch (err) {
      showError(err); 
    }
  };

  const handleEdit = (user: User) => {
    view(user);
  };

  return (
    <AppShell>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Usuários</h1>
          {!isFormOpen && (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => openForm()}
            >
              Novo Usuário
            </button>
          )}
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
