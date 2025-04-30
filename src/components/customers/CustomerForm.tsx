'use client';

import { useForm, Controller } from 'react-hook-form';
import { FormFieldWrapper } from '@/components/form/FormFieldWrapper';
import { FormInput } from '@/components/form/FormInput';
import { MaskedInput } from '@/components/form/MaskedInput';
import { FormToggleGroup } from '@/components/form/FormToggleGroup';
import { FormTextarea } from '@/components/form/FormTextarea';
import { FormSection } from '@/components/form/FormSection';
import { CustomerEntity } from '@/app/customers/entity/customer.entity';
import { FormInputDate } from '../form/FormInputDate';

interface CustomerFormProps {
  defaultValues?: Partial<CustomerEntity>;
  readOnly?: boolean;
  isEditing?: boolean;
  loading?: boolean;
  form: ReturnType<typeof useForm<CustomerEntity>>;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: CustomerEntity) => Promise<void>;
}

export function CustomerForm({
  form,  
  readOnly,
  // eslint-disable-next-line no-unused-vars
  isEditing,
  // eslint-disable-next-line no-unused-vars
  loading,  
}: CustomerFormProps) {

  const watchPersonType = form.watch('personType');

  return (
    <>
      {/* Dados Gerais */}
      <FormSection title="Dados Gerais">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormFieldWrapper
            label="Tipo de Pessoa"
            required={!readOnly}
            error={form.formState.errors.personType}
          >
            <Controller
              control={form.control}
              name="personType"
              render={({ field }) => (
                <FormToggleGroup
                  field={field}
                  disabled={readOnly}
                  options={[
                    { value: "PF", label: "Pessoa Física" },
                    { value: "PJ", label: "Pessoa Jurídica" },
                  ]}
                />
              )}
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            label={watchPersonType === "PF" ? "CPF" : "CNPJ"}
            required={!readOnly}
            error={form.formState.errors.document}
          >
            <Controller
              name="document"
              control={form.control}
              render={({ field }) => (
                <MaskedInput
                  {...field}
                  mask={watchPersonType === "PF" ? "cpf" : "cnpj"}
                  placeholder={watchPersonType === "PF" ? "CPF" : "CNPJ"}
                />
              )}
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            label={watchPersonType === "PF" ? "Nome" : "Nome Fantasia"}
            required={!readOnly}
            error={form.formState.errors.name}
          >
            <FormInput {...form.register("name")} disabled={readOnly} />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Referência"
            error={form.formState.errors.reference}
          >
            <FormInput {...form.register("reference")} disabled={readOnly} />
          </FormFieldWrapper>
        </div>
      </FormSection>

      {/* Informações Adicionais */}
      <FormSection title="Informações Adicionais">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormFieldWrapper
            label="E-mail Principal"
            error={form.formState.errors.email}
          >
            <FormInput
              {...form.register("email")}
              type="email"
              disabled={readOnly}
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Telefone Comercial"
            error={form.formState.errors.phone}
          >
            <Controller
              name="phone"
              control={form.control}
              render={({ field }) => <MaskedInput {...field} mask="phone" />}
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Celular"
            error={form.formState.errors.mobile}
          >
            <Controller
              name="mobile"
              control={form.control}
              render={({ field }) => <MaskedInput {...field} mask="phone" />}
            />
          </FormFieldWrapper>

          {watchPersonType === "PJ" && (
            <FormFieldWrapper
              label="Abertura da Empresa"              
              error={form.formState.errors.openingDate}
            >
              <FormInputDate
                {...form.register("openingDate")}                
                disabled={readOnly}
              />
            </FormFieldWrapper>
          )}
          {watchPersonType === "PF" && (
            <FormFieldWrapper
              label="Data de Nascimento"
              error={form.formState.errors.birthDate}
            >
              <FormInputDate
                {...form.register("birthDate")}   
                control={form.control}             
                disabled={readOnly}
              />
            </FormFieldWrapper>
          )}
        </div>
      </FormSection>

      {/* Endereço */}
      <FormSection title="Endereço">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormFieldWrapper label="País" error={form.formState.errors.country}>
            <FormInput {...form.register("country")} disabled={readOnly} />
          </FormFieldWrapper>

          <FormFieldWrapper label="CEP" error={form.formState.errors.zipCode}>
            <Controller
              name="zipCode"
              control={form.control}
              render={({ field }) => <MaskedInput {...field} mask="cep" />}
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Endereço"
            error={form.formState.errors.address}
          >
            <FormInput {...form.register("address")} disabled={readOnly} />
          </FormFieldWrapper>

          <FormFieldWrapper label="Número" error={form.formState.errors.number}>
            <FormInput {...form.register("number")} disabled={readOnly} />
          </FormFieldWrapper>

          <FormFieldWrapper label="Estado" error={form.formState.errors.state}>
            <FormInput {...form.register("state")} disabled={readOnly} />
          </FormFieldWrapper>

          <FormFieldWrapper label="Cidade" error={form.formState.errors.city}>
            <FormInput {...form.register("city")} disabled={readOnly} />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Bairro"
            error={form.formState.errors.neighborhood}
          >
            <FormInput {...form.register("neighborhood")} disabled={readOnly} />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Complemento"
            error={form.formState.errors.complement}
          >
            <FormInput {...form.register("complement")} disabled={readOnly} />
          </FormFieldWrapper>
        </div>
      </FormSection>

      {/* Observações */}
      <FormSection title="Observações">
        <FormFieldWrapper
          label="Observações"
          error={form.formState.errors.notes}
        >
          <FormTextarea
            {...form.register("notes")}
            rows={5}
            disabled={readOnly}
          />
        </FormFieldWrapper>
      </FormSection>
    </>
  );
}
