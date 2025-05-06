'use client';

import { FormProvider, useForm } from "react-hook-form";
import { QuoteFormDto } from "../dto/quote-form.dto";
import { QuoteEntity } from "../entity/quote.entity";
import { fluentResolver } from "@/lib/fluent-resolver";
import { QuoteFormValidator } from "../validators/QuoteFormValidator";
import { BillingPeriods, LifeCycleTypes, PaymentForms, PaymentMethods, QuoteStatuses } from "../entity/quote.enum";
import { FormPageTemplate } from "@/components/form/FormPageTemplate";
import { FormCancelButton } from "@/components/form/FormCancelButton";
import { FormButton } from "@/components/form/FormButton";
import { QuoteSummary } from "./QuoteSummary";
import QuoteForm from "./QuoteForm";

interface QuoteFormWrapperProps {
  title: string;
  defaultValues?: Partial<QuoteFormDto>;
  isViewing?: boolean;
  isEditing?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: QuoteEntity) => Promise<void>;
  onCancel?: () => void;
}

export function QuoteFormWrapper(props: QuoteFormWrapperProps) {
  const { title, defaultValues, isViewing, isEditing, readOnly, loading, onSubmit, onCancel } = props;

  const form = useForm<QuoteEntity, QuoteFormDto>({
    resolver: fluentResolver<QuoteEntity>(new QuoteFormValidator()),

    defaultValues: {
      qtyInstallments: 1,
      status: QuoteStatuses.DRAFT.value,
      lifeCycleType: LifeCycleTypes.ONE_TIME.value,
      billingPeriod: BillingPeriods.MONTHLY.value,
      paymentForm: PaymentForms.UPFRONT.value,
      paymentMethod: PaymentMethods.CASH.value,
      ...defaultValues,
    } as QuoteFormDto,
  });

  return (
    <FormProvider {...form}>
      <FormPageTemplate
        title={title}
        isViewing={isViewing}
        isEditing={isEditing}
        readOnly={readOnly}
        loading={loading}
        onSubmit={form.handleSubmit(onSubmit)}
        breadcrumbItems={[
          { label: 'Orçamentos', href: '/quotes' },
          { label: title },
        ]}
        actions={
          <>
            <FormCancelButton type="button" onClick={onCancel}>
              {readOnly ? 'Voltar' : 'Cancelar'}
            </FormCancelButton>
            {!readOnly && (
              <FormButton type="submit" disabled={loading}>
                {isEditing ? 'Salvar Alterações' : 'Cadastrar Orçamento'}
              </FormButton>
            )}
          </>
        }
      >
        {readOnly ? (
          <QuoteSummary data={defaultValues as QuoteEntity} />
        ) : (
          <QuoteForm readOnly={readOnly} form={form} />
        )}
      </FormPageTemplate>
    </FormProvider>
  );  
}