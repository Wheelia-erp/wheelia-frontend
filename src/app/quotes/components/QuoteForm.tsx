import CustomerLookup from "@/components/customers/lookups/CustomerLookup";
import { FormCard } from "@/components/form/FormCard";
import { FormFieldWrapper } from "@/components/form/FormFieldWrapper";
import { FormInputDate } from "@/components/form/FormInputDate";
import FormSelect from "@/components/form/FormSelect";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { QuoteEntity, QuoteItemEntity } from "../entity/quote.entity";
import { BillingPeriods, LifeCycleTypes, PaymentForms, PaymentMethods } from "../entity/quote.enum";
import QuoteItemAdd from "./QuoteItemAdd";
import QuoteItemsTable from "./QuoteItemsTable";
import QuoteStatusView from "./QuoteStatus";
import QuoteTotalDisplay from "./QuoteTotalDisplay";

interface QuoteFormProps {  
  readOnly?: boolean;
  form: ReturnType<typeof useForm<QuoteEntity>>;    
}

export default function QuoteForm({ readOnly, form }: QuoteFormProps) {
  const items = useWatch({ control: form.control, name: 'items' }) ?? [];
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalValue = items.reduce(
      (acc, item) => acc + (item.quantity * item.unitPrice - item.discount) ,
      0
    );
    setTotal(totalValue);
  }, [items]);

  const handleAddItem = (quoteItem: QuoteItemEntity) => {   
    quoteItem.quoteId = form.getValues("id"); 
    const quoteItemIndex = (quoteItem.id && items.findIndex(item => item.id === quoteItem.id));    
    if (quoteItemIndex && quoteItemIndex >= 0) {
      items.splice(quoteItemIndex, 1, quoteItem);
    } else {
      items.push(quoteItem);
    }
    form.setValue('items', [...items]);
  };

    
  return (
    <>
      <QuoteStatusView quoteStatus={form.getValues('status')} />      

      <FormCard title="Para Quem e Sobre o Quê?">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormFieldWrapper
            label="Para quem é este orçamento?"
            required={!readOnly}
            className="col-span-2"
          >            
            <CustomerLookup name="customerId"   initialValue={{ id: form.getValues("customerId"), name: form.getValues("customer.name") }}
          />
          </FormFieldWrapper>
          <FormFieldWrapper
            label="Qual o tipo desta venda?"
            required={!readOnly}                        
          >
            <FormSelect name="lifeCycleType" enumSource={LifeCycleTypes} />
          </FormFieldWrapper>

          <FormFieldWrapper label="Este orçamento é válido até quando?">
            <FormInputDate {...form.register('expirationDate')} />
          </FormFieldWrapper>

          <FormFieldWrapper label="Total" 
            className="col-span-2">
            <QuoteTotalDisplay total={total} />
          </FormFieldWrapper>
        </div>
      </FormCard>

      <FormCard title="Como será o Pagamento?">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormFieldWrapper label="Periodicidade">
            <FormSelect name="billingPeriod" enumSource={BillingPeriods} />
          </FormFieldWrapper>
          <FormFieldWrapper label="Qual a condição de pagamento?">
            <FormSelect name="paymentForm" enumSource={PaymentForms} />
          </FormFieldWrapper>
          <FormFieldWrapper
            label="Qual será o meio de pagamento?"
            required={!readOnly}
          >
            <FormSelect name="paymentMethod" enumSource={PaymentMethods} />
          </FormFieldWrapper>
        </div>
      </FormCard>
      <FormCard 
          title="Quais são os produtos e serviços?"          
          titleAction={!readOnly && <QuoteItemAdd onAdd={handleAddItem} />}
        >
        <QuoteItemsTable quoteItems={items} form={form} readOnly={readOnly} />
        
      </FormCard>
    </>
  );
}
