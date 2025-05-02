'use client';

import { ProductFormDto } from '@/app/products/dto/product-form.dto';
import { LifeCycleTypes, ProrationPolicies } from '@/app/products/entity/product.enums';
import { FormSection } from '@/components/form/FormSection';
import { getLabelByValue } from '@/lib/utils';

interface ProducSummaryProps {
  data: ProductFormDto;
}

export function ProductSummary({ data }: ProducSummaryProps) {
  return (
    <div className="space-y-8">
      {/* Dados Gerais */}
      <FormSection title="Dados Gerais">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <SummaryItem label="Identificador" value={data.code} />
          <SummaryItem label="Nome" value={data.name} />
          <SummaryItem label="Valor base" value={data.price?.toString()} />
          <SummaryItem label="Unidade de medida" value={data.unit} />
        </div>
        <div className="p-3 bg-gray-50 rounded border text-sm text-gray-700 whitespace-pre-line">
          {data.description || "Nenhuma descrição foi informada."}
        </div>
      </FormSection>

      {/* Informações Adicionais */}
      <FormSection title="Informações Adicionais">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <SummaryItem
            label="Tipo de cobrança"
            value={getLabelByValue(LifeCycleTypes, data.lifeCycleType)}
          />
          <SummaryItem label="Permitir cobrança proporcional no upgrade?" value={getLabelByValue(ProrationPolicies, data.proration)} />
        </div>
      </FormSection>
      <FormSection title="Informações Fiscais">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <SummaryItem label="Código NBS" value={data.nbsCode} />
          <SummaryItem label="Código CNAE" value={data.cnaeCode} />
          <SummaryItem label="Alíquota de ISS (%)" value={data.issRate?.toString()} />
          <SummaryItem
            label="Código do serviço municipal"
            value={data.municipalServiceCode?.toString()}
          />
          <SummaryItem
            label="Descrição fiscal para NFS-e"
            value={data.nfseDescription?.toString()}
          />
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