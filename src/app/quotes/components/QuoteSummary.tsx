'use client';

import { FormCard } from "@/components/form/FormCard";
import { currencyFormat, formatDate, getLabelByValue } from "@/lib/utils";
import { useForm, useWatch } from "react-hook-form";
import { QuoteEntity } from "../entity/quote.entity";
import { BillingPeriods, LifeCycleTypes, PaymentForms, PaymentMethods } from "../entity/quote.enum";
import QuoteItemsTable from "./QuoteItemsTable";
import QuoteStatusView from "./QuoteStatus";

interface QuoteSummaryProps {
  data: QuoteEntity;  
  form: ReturnType<typeof useForm<QuoteEntity>>;
}

export function QuoteSummary({ data, form }: QuoteSummaryProps) {

  const items = useWatch({ control: form.control, name: 'items' }) ?? [];
  
  return (
    <div className="space-y-8">
      <QuoteStatusView quoteStatus={data.status} />
      {/* Dados Gerais*/}
      <FormCard title="Para Quem e Sobre o Quê?">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <SummaryItem label="Identificador" value={'#' + data.code} />
          <SummaryItem label="Cliente" value={data.customer.name} />
          <SummaryItem
            label="Qual o tipo desta venda?"
            value={getLabelByValue(LifeCycleTypes, data.lifeCycleType)}
          />
          <SummaryItem
            label="Data de expiração"
            value={formatDate(data.expirationDate)}
          />
          <SummaryItem label="Valor total" value={currencyFormat(data.total)} />
        </div>
      </FormCard>
      <FormCard title="Como será o Pagamento?">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <SummaryItem
            label="Periodicidade"
            value={getLabelByValue(
              BillingPeriods,
              data.billingPeriod ?? BillingPeriods.MONTHLY.value
            )}
          />
          <SummaryItem
            label="Qual a condição de pagamento?"
            value={getLabelByValue(
              PaymentForms,
              data.paymentForm ?? PaymentForms.UPFRONT.value
            )}
          />
          <SummaryItem
            label="Qual será o meio de pagamento"
            value={getLabelByValue(
              PaymentMethods,
              data.paymentMethod ?? PaymentMethods.CASH.value
            )}
          />
        </div>
      </FormCard>
      <div>
        <FormCard title="Quais são os produtos e serviços?">
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