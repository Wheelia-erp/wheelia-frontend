'use client';

import { FormSection } from "@/components/form/FormSection";
import { QuoteFormDto } from "../dto/quote-form.dto";

interface QuoteSummaryProps {
  data: QuoteFormDto;  
}

export function QuoteSummary({ data }: QuoteSummaryProps) {
  return (
    <div className="space-y-8">
      {/* Dados Gerais*/}
      <FormSection title="Dados Gerais">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <SummaryItem label="Código NBS" value={data.customerId} />
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