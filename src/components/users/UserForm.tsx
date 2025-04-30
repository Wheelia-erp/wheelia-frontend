'use client';

import { useForm } from 'react-hook-form';
import { UserFormValidator } from '@/app/validators/UserFormValidator';
import { fluentResolver } from '@/lib/fluent-resolver';
import { FormFieldWrapper } from '../form/FormFieldWrapper';
import { FormInput } from '../form/FormInput';
import { UserEntity } from '@/app/settings/users/entity/user.entity';
import { UserFormDto } from '@/app/settings/users/dto/user-form.dto';

export type UserFormValues = {
  name: string;
  email: string;
  phone?: string;
  isActive?: boolean;
  password?: string;
};

interface UserFormProps {
  defaultValues?: Partial<UserFormDto>;
  isEditing?: boolean;
  isReadOnly?: boolean;
  onCancel?: () => void;
  loading?: boolean;
}

export function UserForm({ defaultValues,isEditing, isReadOnly }: UserFormProps) {
  const form = useForm<UserEntity, UserFormDto>({
    resolver: fluentResolver<UserEntity>(new UserFormValidator()),
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
    formState: { errors },
  } = form;

  return (  
    <>  
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
    </>
  )
}
