'use client';

import { CustomerFormValues, CustomerForm } from './CustomerForm';
import { FormPageTemplate } from '@/components/form/FormPageTemplate';
import { FormButton } from '@/components/form/FormButton';
import { FormCancelButton } from '@/components/form/FormCancelButton';
import { CustomerSummary } from './CustomerSummary';

interface CustomerFormWrapperProps {
  title: string;
  defaultValues?: Partial<CustomerFormValues>;
  isEditing?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: CustomerFormValues) => Promise<void>;
  onCancel: () => void;
}

export function CustomerFormWrapper({
  title,
  defaultValues,
  isEditing,
  readOnly,
  loading,
  onSubmit,
  onCancel,
}: CustomerFormWrapperProps) {
  return (
    <FormPageTemplate
      title={title}
      description="Preencha os dados do cliente."
      breadcrumbItems={[
        { label: 'Clientes', href: '/customers' },
        { label: title },
      ]}
      actions={
        !readOnly && (
          <>
            <FormCancelButton type="button" onClick={onCancel}>
              Cancelar
            </FormCancelButton>
            <FormButton type="submit" disabled={loading}>
              {isEditing ? 'Salvar Alterações' : 'Cadastrar Cliente'}
            </FormButton>
          </>
        )
      }
    >
      {readOnly ? (
        <CustomerSummary data={defaultValues as CustomerFormValues} />
      ) : (
        <CustomerForm
          defaultValues={defaultValues}
          readOnly={readOnly}
          onSubmit={onSubmit}
          isEditing={isEditing}
          loading={loading}
        />
      )}
    </FormPageTemplate>
  );
}
