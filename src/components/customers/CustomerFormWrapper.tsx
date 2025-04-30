'use client';

import { CustomerForm } from './CustomerForm';
import { FormPageTemplate } from '@/components/form/FormPageTemplate';
import { FormButton } from '@/components/form/FormButton';
import { FormCancelButton } from '@/components/form/FormCancelButton';
import { CustomerSummary } from './CustomerSummary';
import { fluentResolver } from '@/lib/fluent-resolver';
import { CustomerFormValidator } from './validators/CustomerFormValidator';
import { CustomerFormDto } from '@/app/customers/dto/customer-form.dto';
import { CustomerEntity } from '@/app/customers/entity/customer.entity';
import { FormProvider, useForm } from 'react-hook-form';

interface CustomerFormWrapperProps {
  title: string;
  defaultValues?: Partial<CustomerFormDto>;
  isViewing?: boolean;
  isEditing?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: CustomerEntity) => Promise<void>;
  onCancel: () => void;
}

export function CustomerFormWrapper({
  title,
  defaultValues,
  isViewing,
  isEditing,  
  readOnly,
  loading,
  onSubmit,
  onCancel,
}: CustomerFormWrapperProps) {
const form = useForm<CustomerEntity, CustomerFormDto>({
  resolver: fluentResolver<CustomerEntity>(new CustomerFormValidator()),
  defaultValues: {
    personType: "PF",
    ...defaultValues,
  },
});

  return (
    <FormProvider {...form}>
      <FormPageTemplate
        title={title}
        onSubmit={form.handleSubmit(onSubmit)}
        loading={loading}
        isViewing={isViewing}
        isEditing={isEditing}
        readOnly={readOnly}
        breadcrumbItems={[
          { label: "Clientes", href: "/customers" },
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
          <CustomerSummary data={defaultValues as CustomerEntity} />
        ) : (
          <CustomerForm
            form={form}
            defaultValues={defaultValues as CustomerEntity}
            readOnly={readOnly}
            onSubmit={onSubmit}
            isEditing={isEditing}
            loading={loading}
          />
        )}
      </FormPageTemplate>
    </FormProvider>
  );
}
