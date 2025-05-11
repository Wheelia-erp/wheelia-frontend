import { useForm, useWatch } from "react-hook-form";
import { QuoteEntity, QuoteItemEntity } from "../entity/quote.entity";
import { FormSection } from "@/components/form/FormSection";
import { FormFieldWrapper } from "@/components/form/FormFieldWrapper";
import { FormInput } from "@/components/form/FormInput";
import QuoteItemsTable from "./QuoteItemsTable";
import CustomerLookup from "@/components/customers/lookups/CustomerLookup";
import { FormInputDate } from "@/components/form/FormInputDate";
import FormSelect from "@/components/form/FormSelect";
import { BillingPeriods, LifeCycleTypes, PaymentForms, PaymentMethods } from "../entity/quote.enum";
import QuoteItemAdd from "./QuoteItemAdd";

interface QuoteFormProps {
  readOnly?: boolean;
  form: ReturnType<typeof useForm<QuoteEntity>>;    
}

export default function QuoteForm({ readOnly, form }: QuoteFormProps) {
  const items = useWatch({ control: form.control, name: 'items' }) ?? [];

  const handleAddItem = (quoteItem: QuoteItemEntity) => {
    
    const quoteItemIndex = items.findIndex(item => item.id === quoteItem.id);
    if (quoteItemIndex >= 0) {
      items.splice(quoteItemIndex, 1, quoteItem);
    } else {
      items.push(quoteItem);
    }
    form.setValue('items', [...items]);
  };

  return (
    <>
      <FormSection title="Dados Gerais">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">          
          <FormFieldWrapper label="Cliente" required={!readOnly}>
            <CustomerLookup name="customerId" />
          </FormFieldWrapper>
          <FormFieldWrapper label="Total" readOnly={true}>
            <FormInput {...(form.register('total'), { readOnly: true })} />
          </FormFieldWrapper>
          <FormFieldWrapper label="Status">
            <FormInput {...form.register('status')} />
          </FormFieldWrapper>
          <FormFieldWrapper label="Tipo de venda">
            <FormSelect name="lifeCycleType" enumSource={LifeCycleTypes} />
          </FormFieldWrapper>
          <FormFieldWrapper label="Periodicidade">
            <FormSelect name="billingPeriod" enumSource={BillingPeriods} />
          </FormFieldWrapper>
          <FormFieldWrapper label="Forma de pagamento">
            <FormSelect name="paymentForm" enumSource={PaymentForms} />
          </FormFieldWrapper>
          <FormFieldWrapper label="Método de pagamento">
            <FormSelect name="paymentMethod" enumSource={PaymentMethods} />
          </FormFieldWrapper>
          <FormFieldWrapper label="Data de Expiração">
            <FormInputDate {...form.register('expirationDate')} />
          </FormFieldWrapper>
        </div>
      </FormSection>
      <FormSection
        title="Produtos/Serviços"
        titleAction={
          !readOnly && <QuoteItemAdd onAdd={handleAddItem} />
        }
      >
        <QuoteItemsTable quoteItems={items} form={form} readOnly={readOnly} />
      </FormSection>
    </>
  );
}
