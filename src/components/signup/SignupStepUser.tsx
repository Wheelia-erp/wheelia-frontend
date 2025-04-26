'use client';

import { FormButton } from '@/components/form/FormButton';
import { FormFieldWrapper } from '../form/FormFieldWrapper';
import { FormInput } from '../form/FormInput';
import { useForm } from 'react-hook-form';
import { fluentResolver } from '@/lib/fluent-resolver';
import { SignupUserFormValidator, SignupUserFormValues } from './validators/SignupUserFormValidator';

interface Props {
    
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: SignupUserFormValues) => void;
  onBack: () => void;
}

export function SignupStepUser({ onSubmit, onBack }: Props) {

    const form = useForm<SignupUserFormValues>({
        resolver: fluentResolver(new SignupUserFormValidator()),
        defaultValues: {
            name: '',
            email: '',            
            password: '',            
        },
        
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = form;

    return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Dados do usuário</h2>
      
              <div className="grid grid-cols-2 gap-5"></div>          
              <div className='grid gap-y-6 mb-5'>
                <div className="grid grid-cols-1 gap-5">
                    <FormFieldWrapper
                        label="Nome"
                        htmlFor="name"
                        required                    
                        error={errors.name?.message}
                    >
                        <FormInput id="name" {...register('name')} />
                    </FormFieldWrapper>

                    <FormFieldWrapper
                        label="E-mail"
                        htmlFor="email"
                        required                                
                        error={errors.email?.message}
                    >
                        <FormInput id="email" type="email" placeholder='email@email.com' {...register('email')} />
                    </FormFieldWrapper>

                    <FormFieldWrapper
                        label="Senha"
                        htmlFor="password" 
                        required                            
                        error={errors.password?.message}
                    >
                        <FormInput id="password" type="password" placeholder='********' {...register('password')} />
                    </FormFieldWrapper> 

                    <FormFieldWrapper
                        label="Confirme sua senha"
                        htmlFor="password" 
                        required                            
                        error={errors.confirmPassword?.message}
                    >
                        <FormInput id="passwordConfirm" type="password" placeholder='********' {...register('confirmPassword')} />
                    </FormFieldWrapper>                
                </div>
              </div>
              </div>
              <div className='grid grid-cols-2'>
                <div >
                    <FormButton type="button" variant="secondary" onClick={onBack}>
                        Voltar
                    </FormButton>
                </div>
              <div className="flex justify-end">
                <FormButton type="submit" disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
                    Finalizar
                </FormButton>      
            </div>
            </div>
          </form>
    </div>
  );
}
