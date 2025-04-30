// UserFormWrapper.tsx
'use client';

import { useForm } from 'react-hook-form';
import { FormButton } from '../form/FormButton';
import { FormCancelButton } from '../form/FormCancelButton';
import { FormPageTemplate } from '../form/FormPageTemplate';
import { UserForm } from './UserForm';
import { UserEntity } from '@/app/settings/users/entity/user.entity';
import { UserFormValidator } from '@/components/users/validators/UserFormValidator';
import { fluentResolver } from '@/lib/fluent-resolver';
import { UserSummary } from './UserSummary';

interface Props {
  title: string;
  defaultValues?: Partial<UserEntity>;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: UserEntity) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  isEditing?: boolean;
  isViewing?: boolean;
  readOnly?: boolean;
}

export function UserFormWrapper({
  title,
  defaultValues,
  onSubmit,
  onCancel,
  loading,
  isViewing,
  isEditing,
  readOnly,
}: Props) {
  const form = useForm<UserEntity>({
    resolver: fluentResolver<UserEntity>(new UserFormValidator()),
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <FormPageTemplate
      title={title}
      isViewing={isViewing}
      isEditing={isEditing}
      readOnly={readOnly}
      loading={loading}
      onSubmit={form.handleSubmit(onSubmit)}
      breadcrumbItems={[
        { label: "Usuários", href: "/settings/users" },
        { label: title },
      ]}
      actions={
        <>
          <FormCancelButton type="button" onClick={onCancel}>
            {readOnly ? "Voltar" : "Cancelar"}
          </FormCancelButton>
          {!readOnly && (
            <FormButton type="submit" disabled={loading}>
              {isEditing ? "Salvar Alterações" : "Cadastrar Cliente"}
            </FormButton>
          )}
        </>
      }
    >
      {readOnly ? (
        <UserSummary data={defaultValues as UserEntity} />
      ) : (
        <UserForm
          defaultValues={defaultValues}
          onCancel={onCancel}
          loading={loading}
          isEditing={isEditing}
          isReadOnly={readOnly}
        />
      )}
    </FormPageTemplate>
  );
}
