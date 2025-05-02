'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { TenantFormValues, TenantFormValidator } from './validators/TenantFormValidator';
import { fluentResolver } from '@/lib/fluent-resolver';
import { FormFieldWrapper } from '@/components/form/FormFieldWrapper';
import { FormInput } from '@/components/form/FormInput';
import { FormButton } from '@/components/form/FormButton';
import { FormInputCnpj } from '../form/FormInputCnpj';
import { FormInputPhone } from '../form/FormInputPhone';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: TenantFormValues) => void;
}

export function SignupStepTenant({ onSubmit }: Props) {
  const form = useForm<TenantFormValues>({
    resolver: fluentResolver(new TenantFormValidator()),
    defaultValues: {
      tenantName: '',
      documentNumber: '',
      phoneNumber: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },    
  } = form;

  return (
    <FormProvider {...form}>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Dados da empresa</h2>

        <div className="grid grid-cols-2 gap-5"></div>          
        <div className='grid gap-y-6 mb-5'>
        <FormFieldWrapper label="Nome da Empresa" htmlFor="tenantName" required error={errors.tenantName?.message}>
            <FormInput id="tenantName" {...register('tenantName')} />
        </FormFieldWrapper>
        </div>
        <div className='flex grid gap-y-6 mb-5'>
        <FormFieldWrapper label="CNPJ" htmlFor="documentNumber" required error={errors.documentNumber?.message}>
            <FormInputCnpj placeholder='00.000.000/0000-00' {...register('documentNumber')} />            
        </FormFieldWrapper>
        </div>
        <div className='flex grid gap-y-6 mb-5'>
        <FormFieldWrapper label="Telefone" htmlFor="phoneNumber" required error={errors.phoneNumber?.message} >
            <FormInputPhone placeholder='(00) 00000-0000' {...register('phoneNumber')} />            
        </FormFieldWrapper>
        </div>
      </div>
      <div className="flex justify-end">
        <FormButton type="submit" disabled={isSubmitting}>
          Próximo
        </FormButton>      
      </div>
    </form>
    </FormProvider>
  );
}
