// UserFormWrapper.tsx
'use client';

import { UserForm, UserFormValues } from './UserForm';

interface Props {
  title: string;
  defaultValues?: Partial<UserFormValues>;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: UserFormValues) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  isEditing?: boolean;
  readOnly?: boolean;
}

export function UserFormWrapper({
  title,
  defaultValues,
  onSubmit,
  onCancel,
  loading,
  isEditing = false,
  readOnly: isReadOnly = true,
}: Props) {
  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>        
            <button className="text-gray-500 hover:text-gray-700" onClick={onCancel}>
                {isReadOnly ? 'Fechar' : 'Cancelar'}            
            </button>        
      </div>
      <UserForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onCancel={onCancel}
        loading={loading}
        isEditing={isEditing}
        isReadOnly={isReadOnly}
      />
    </div>
  );
}
