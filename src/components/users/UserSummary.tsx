'use client';

import { UserEntity } from '@/app/settings/users/entity/user.entity';
import { FormSection } from '@/components/form/FormSection';

interface UserSummaryProps {
  data: UserEntity;
}

export function UserSummary({ data }: UserSummaryProps) {
  return (
    <div className="space-y-8">
      {/* Dados Gerais */}
      <FormSection title="Dados Gerais">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <SummaryItem label="Nome" value={data.name} />          
          <SummaryItem label="Telefone" value={data.phone} />
          <SummaryItem label="E-mail" value={data.email} />          
        </div>
      </FormSection>

      {/* Informações Adicionais */}
      <FormSection title="Informações Adicionais">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <SummaryItem label="Perfil" value={data.role} />          
        </div>
      </FormSection>
    </div>
  );
}

interface SummaryItemProps {
  label: string;
  value?: string | null;
}

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value || '-'}</span>
    </div>
  );
}
