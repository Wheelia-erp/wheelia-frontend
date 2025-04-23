'use client';

import { useForm } from 'react-hook-form';
import { UserFormValidator } from '@/app/validators/UserFormValidator';
import { fluentResolver } from '@/lib/fluent-resolver';
import { FormFieldWrapper } from '../form/FormFieldWrapper';
import { FormInput } from '../form/FormInput';
import { FormButton } from '../form/FormButton';
import { FormCancelButton } from '../form/FormCancelButton';

export type UserFormValues = {
  name: string;
  email: string;
  phone?: string;
  password?: string;
};

interface UserFormProps {
  defaultValues?: Partial<UserFormValues>;
  
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: UserFormValues) => Promise<void>;
  isEditing?: boolean;
  isReadOnly?: boolean;
  onCancel?: () => void;
  loading?: boolean;
}

export function UserForm({ defaultValues, onSubmit, onCancel, loading, isEditing, isReadOnly }: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: fluentResolver<UserFormValues>(new UserFormValidator()),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      ...defaultValues,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Informações Gerais</h2>

        <div className="grid grid-cols-1 gap-5">
          <FormFieldWrapper
            label="Nome"
            htmlFor="name"
            required
            readOnly={isReadOnly}
            error={errors.name?.message}
          >
            <FormInput id="name" readOnly={isReadOnly} {...register('name')} />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="E-mail"
            htmlFor="email"
            required            
            readOnly={isReadOnly}
            error={errors.email?.message}
          >
            <FormInput id="email" type="email" disabled={isEditing}  readOnly={isReadOnly} {...register('email')} />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Telefone"
            htmlFor="phone"            
            readOnly={isReadOnly}
            error={errors.phone?.message}
          >
            <FormInput id="phone" type="tel"  readOnly={isReadOnly} {...register('phone')} />
          </FormFieldWrapper>

          { !isEditing && (
          <FormFieldWrapper
            label="Senha"
            htmlFor="password" 
            required            
            readOnly={isReadOnly}
            error={errors.password?.message}
          >
            <FormInput id="password" readOnly={isReadOnly} type="password" {...register('password')} />
          </FormFieldWrapper>)
        }        
        </div>
        
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <FormCancelButton type="button" onClick={onCancel}>
             {isReadOnly ? 'Fechar' : 'Cancelar'}
          </FormCancelButton>
        )}
        {!isReadOnly && (
        <FormButton type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </FormButton>
        )}
      </div>
      
    </form>
  );
}
