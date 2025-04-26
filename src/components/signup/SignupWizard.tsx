'use client';

import { useState } from 'react';
import { SignupStepTenant } from '@/components/signup/SignupStepTenant';
import { SignupStepUser } from '@/components/signup/SignupStepUser';
import { TenantFormValues } from '@/components/signup/validators/TenantFormValidator';
import { UserFormValues } from '../users/UserForm';
import backendApi from '@/lib/backendApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type SignupSteps = 'tenant' | 'user';

export function SignupWizard() {
  const [step, setStep] = useState<SignupSteps>('tenant');
  const [tenantData, setTenantData] = useState<TenantFormValues | null>(null);
  const router = useRouter();

  const handleTenantSubmit = async (data: TenantFormValues) => {
    setTenantData(data);
    setStep('user');
  };

  const handleUserSubmit = async (userData: UserFormValues) => {
    try {
      const payload = {
        tenant: tenantData,
        admin: { 
            name: userData.name,
            email: userData.email,
            password: userData.password,
        },
      };

      // eslint-disable-next-line no-unused-vars
      const res = await backendApi.post('/auth/signup', payload, {
        withCredentials: true,
      });

      toast.success('Conta criada com sucesso!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error('Erro ao criar conta: ' + (err?.response?.data?.message ?? 'Erro inesperado.'));
    }
  };

  return (
    <div className="w-[70%] max-w-4xl mx-auto space-y-6 p-8 bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold">Criar conta</h1>
      {step === 'tenant' && <SignupStepTenant onSubmit={handleTenantSubmit} />}
      {step === 'user' && tenantData && (
        <SignupStepUser onSubmit={handleUserSubmit} onBack={() => setStep('tenant')} />
      )}
    </div>
  );
}
