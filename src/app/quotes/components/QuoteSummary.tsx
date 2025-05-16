'use client';

import { currencyFormat, formatDate, getLabelByValue } from "@/lib/utils";
import { BillingPeriods, LifeCycleTypes, PaymentForms, PaymentMethods, QuoteStatuses } from "../entity/quote.enum";
import QuoteItemsTable from "./QuoteItemsTable";
import { QuoteEntity } from "../entity/quote.entity";
import { useForm, useWatch } from "react-hook-form";
import { FormCard } from "@/components/form/FormCard";

interface QuoteSummaryProps {
  data: QuoteEntity;  
  form: ReturnType<typeof useForm<QuoteEntity>>;
}

export function QuoteSummary({ data, form }: QuoteSummaryProps) {

  const items = useWatch({ control: form.control, name: 'items' }) ?? [];
  
  return (
    <div className="space-y-8">
      {/* Dados Gerais*/}
      <FormCard title="Dados Gerais">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <SummaryItem label="Identificador" value={'#' + data.code} />
          <SummaryItem
            label="Cliente"
            value={data.customer.document + ' - ' + data.customer.name}
          />
          <SummaryItem label="Valor total" value={currencyFormat(data.total)} />
          <SummaryItem
            label="Status"
            value={getLabelByValue(QuoteStatuses, data.status)}
          />
          <SummaryItem
            label="Tipo de venda"
            value={getLabelByValue(LifeCycleTypes, data.lifeCycleType)}
          />
          <SummaryItem
            label="Periodicidade"
            value={getLabelByValue(
              BillingPeriods,
              data.billingPeriod ?? BillingPeriods.MONTHLY.value
            )}
          />
          <SummaryItem
            label="Forma de pagamento"
            value={getLabelByValue(
              PaymentForms,
              data.paymentForm ?? PaymentForms.UPFRONT.value
            )}
          />
          <SummaryItem
            label="Método de pagamento"
            value={getLabelByValue(
              PaymentMethods,
              data.paymentMethod ?? PaymentMethods.CASH.value
            )}
          />
          <SummaryItem
            label="Data de expiração"
            value={formatDate(data.expirationDate)}
          />
        </div>
      </FormCard>
      <div>
        <FormCard title="Produtos/Serviços">
          <div className="height-full flex-shrink-0 w-full">
            <QuoteItemsTable quoteItems={items} form={form} readOnly={true} />
          </div>
        </FormCard>
      </div>
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