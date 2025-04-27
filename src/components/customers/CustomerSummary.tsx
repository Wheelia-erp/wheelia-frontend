'use client';

import { CustomerFormValues } from './CustomerForm';
import { FormSection } from '@/components/form/FormSection';

interface CustomerSummaryProps {
  data: CustomerFormValues;
}

export function CustomerSummary({ data }: CustomerSummaryProps) {
  return (
    <div className="space-y-8">
      {/* Dados Gerais */}
      <FormSection title="Dados Gerais">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <SummaryItem label="Tipo de Pessoa" value={data.personType === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'} />
          <SummaryItem label={data.personType === 'PF' ? 'CPF' : 'CNPJ'} value={data.document} />
          <SummaryItem label={data.personType === 'PF' ? 'Nome' : 'Nome Fantasia'} value={data.name} />
          <SummaryItem label="Referência" value={data.reference} />
        </div>
      </FormSection>

      {/* Informações Adicionais */}
      <FormSection title="Informações Adicionais">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <SummaryItem label="E-mail" value={data.email} />
          <SummaryItem label="Telefone Comercial" value={data.phone} />
          <SummaryItem label="Celular" value={data.mobile} />
          <SummaryItem label={data.personType === 'PF' ? 'Data de Nascimento' : 'Abertura da Empresa'} value={data.birthOrOpeningDate} />
        </div>
      </FormSection>

      {/* Endereço */}
      <FormSection title="Endereço">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <SummaryItem label="País" value={data.country} />
          <SummaryItem label="CEP" value={data.zipCode} />
          <SummaryItem label="Endereço" value={data.address} />
          <SummaryItem label="Número" value={data.number} />
          <SummaryItem label="Estado" value={data.state} />
          <SummaryItem label="Cidade" value={data.city} />
          <SummaryItem label="Bairro" value={data.district} />
          <SummaryItem label="Complemento" value={data.complement} />
        </div>
      </FormSection>

      {/* Observações */}
      <FormSection title="Observações">
        <div className="p-3 bg-gray-50 rounded border text-sm text-gray-700 whitespace-pre-line">
          {data.notes || 'Nenhuma observação informada.'}
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
