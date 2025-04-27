'use client';

import { useForm, Controller } from 'react-hook-form';
import { FormFieldWrapper } from '@/components/form/FormFieldWrapper';
import { FormInput } from '@/components/form/FormInput';
import { MaskedInput } from '@/components/form/MaskedInput';
import { fluentResolver } from '@/lib/fluent-resolver';
import { CustomerFormValidator } from '@/components/customers/validators/CustomerFormValidator';
import { FormToggleGroup } from '@/components/form/FormToggleGroup';
import { FormTextarea } from '@/components/form/FormTextarea';
import { FormSection } from '@/components/form/FormSection';

export type CustomerFormValues = {
  personType: 'PF' | 'PJ';
  document: string;
  name: string;
  reference?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  birthOrOpeningDate?: string;
  country?: string;
  zipCode?: string;
  address?: string;
  number?: string;
  state?: string;
  city?: string;
  district?: string;
  complement?: string;
  notes?: string;
};

interface CustomerFormProps {
  defaultValues?: Partial<CustomerFormValues>;
  readOnly?: boolean;
  isEditing?: boolean;
  loading?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: CustomerFormValues) => Promise<void>;
}

export function CustomerForm({
  defaultValues,
  readOnly,
  // eslint-disable-next-line no-unused-vars
  isEditing,
  // eslint-disable-next-line no-unused-vars
  loading,
  onSubmit,
}: CustomerFormProps) {
  const form = useForm<CustomerFormValues>({
    resolver: fluentResolver<CustomerFormValues>(new CustomerFormValidator()),
    defaultValues: {
      personType: 'PF',
      ...defaultValues,
    },
  });

  const watchPersonType = form.watch('personType');

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* Dados Gerais */}
      <FormSection title="Dados Gerais">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormFieldWrapper label="Tipo de Pessoa" required={!readOnly} error={form.formState.errors.personType}>
            <Controller
              control={form.control}
              name="personType"
              render={({ field }) => (
                <FormToggleGroup
                  field={field}
                  disabled={readOnly}
                  options={[
                    { value: 'PF', label: 'Pessoa Física' },
                    { value: 'PJ', label: 'Pessoa Jurídica' },
                  ]}
                />
              )}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label={watchPersonType === 'PF' ? 'CPF' : 'CNPJ'} required={!readOnly} error={form.formState.errors.document}>
            <MaskedInput
              {...form.register('document')}
              mask={watchPersonType === 'PF' ? 'cpf' : 'cnpj'}
              disabled={readOnly}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label={watchPersonType === 'PF' ? 'Nome' : 'Nome Fantasia'} required={!readOnly} error={form.formState.errors.name}>
            <FormInput
              {...form.register('name')}
              disabled={readOnly}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Referência" error={form.formState.errors.reference}>
            <FormInput
              {...form.register('reference')}
              disabled={readOnly}
            />
          </FormFieldWrapper>
        </div>
      </FormSection>

      {/* Informações Adicionais */}
      <FormSection title="Informações Adicionais">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormFieldWrapper label="E-mail Principal" error={form.formState.errors.email}>
            <FormInput
              {...form.register('email')}
              type="email"
              disabled={readOnly}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Telefone Comercial" error={form.formState.errors.phone}>
            <MaskedInput
              {...form.register('phone')}
              mask="phone"
              disabled={readOnly}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Celular" error={form.formState.errors.mobile}>
            <MaskedInput
              {...form.register('mobile')}
              mask="phone"
              disabled={readOnly}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label={watchPersonType === 'PF' ? 'Data de Nascimento' : 'Abertura da Empresa'} error={form.formState.errors.birthOrOpeningDate}>
            <FormInput
              {...form.register('birthOrOpeningDate')}
              type="date"
              disabled={readOnly}
            />
          </FormFieldWrapper>
        </div>
      </FormSection>

      {/* Endereço */}
      <FormSection title="Endereço">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormFieldWrapper label="País" error={form.formState.errors.country}>
            <FormInput
              {...form.register('country')}
              disabled={readOnly}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="CEP" error={form.formState.errors.zipCode}>
            <MaskedInput
              {...form.register('zipCode')}
              mask="cep"
              disabled={readOnly}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Endereço" error={form.formState.errors.address}>
            <FormInput
              {...form.register('address')}
              disabled={readOnly}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Número" error={form.formState.errors.number}>
            <FormInput
              {...form.register('number')}
              disabled={readOnly}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Estado" error={form.formState.errors.state}>
            <FormInput
              {...form.register('state')}
              disabled={readOnly}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Cidade" error={form.formState.errors.city}>
            <FormInput
              {...form.register('city')}
              disabled={readOnly}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Bairro" error={form.formState.errors.district}>
            <FormInput
              {...form.register('district')}
              disabled={readOnly}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Complemento" error={form.formState.errors.complement}>
            <FormInput
              {...form.register('complement')}
              disabled={readOnly}
            />
          </FormFieldWrapper>
        </div>
      </FormSection>

      {/* Observações */}
      <FormSection title="Observações">
        <FormFieldWrapper label="Observações" error={form.formState.errors.notes}>
          <FormTextarea
            {...form.register('notes')}
            rows={5}
            disabled={readOnly}
          />
        </FormFieldWrapper>
      </FormSection>
    </form>
  );
}
