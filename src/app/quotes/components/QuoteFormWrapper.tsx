'use client';

import { FormButton } from "@/components/form/FormButton";
import { FormCancelButton } from "@/components/form/FormCancelButton";
import { FormPageTemplate } from "@/components/form/FormPageTemplate";
import { fluentResolver } from "@/lib/fluent-resolver";
import { formatDatetime } from "@/lib/utils";
import { FilePlus2Icon, RefreshCwIcon } from "lucide-react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { QuoteFormDto } from "../dto/quote-form.dto";
import { QuoteEntity } from "../entity/quote.entity";
import { BillingPeriods, LifeCycleTypes, PaymentForms, PaymentMethods, QuoteStatuses } from "../entity/quote.enum";
import { QuoteFormValidator } from "../validators/QuoteFormValidator";
import QuoteForm from "./QuoteForm";
import { QuoteSummary } from "./QuoteSummary";
import QuoteTotalDisplay from "./QuoteTotalDisplay";


interface QuoteFormWrapperProps {
  title: string;
  identifier: string;
  defaultValues?: Partial<QuoteFormDto>;
  isViewing?: boolean;
  isEditing?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: QuoteEntity) => Promise<void>;
  onCancel?: () => void;
  // eslint-disable-next-line no-unused-vars
  onEdit?: (quote: QuoteEntity) => void;
}

export function QuoteFormWrapper(props: QuoteFormWrapperProps) {
  const { title, identifier, defaultValues, isViewing, isEditing, readOnly, loading, onSubmit, onCancel, onEdit } = props;
  
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
  const total = useWatch({ control: form.control, name: "total" }) ?? 0;
  return (
    <FormProvider {...form}>
      <FormPageTemplate
        title={title}
        identifier={identifier}
        isViewing={isViewing}
        isEditing={isEditing}
        readOnly={readOnly}
        loading={loading}
        onSubmit={form.handleSubmit(onSubmit)}  
        onCancel={onCancel}    
        headerChildLeft={
            <div className="flex items-center">
            <div style={{ fontSize: '0.7rem' }} className="text-gray-400 text-sm flex items-center">
              <FilePlus2Icon className="text-gray-400 inline-block" style={{ width: '1em', height: '1em' }} />
              &nbsp;Criado em {formatDatetime(form.getValues('createdAt'))} por {form.getValues('createdBy') as string}&nbsp;|&nbsp;
              <RefreshCwIcon className="text-gray-400 inline-block" style={{ width: '1em', height: '1em' }} />
              &nbsp;Atualizado em {formatDatetime(form.getValues('updatedAt'))} por {form.getValues('updatedBy') as string}
            </div>
            </div>
        }
        headerChildRight={
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <QuoteTotalDisplay total={total} />
            </div>
          </div>
        }
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
            {readOnly && (
              <FormButton
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit ? onEdit(defaultValues as QuoteEntity) : undefined;
                }}
              >
                Editar
              </FormButton>
            )}
          </>
        }
      >
        {readOnly ? (
          <QuoteSummary form={form} data={defaultValues as QuoteEntity} />
        ) : (
          <QuoteForm readOnly={readOnly} form={form} />
        )}
      </FormPageTemplate>
    </FormProvider>
  );  
}