import { useForm, useWatch } from "react-hook-form";
import { QuoteEntity, QuoteItemEntity } from "../entity/quote.entity";
import { FormSection } from "@/components/form/FormSection";
import { FormFieldWrapper } from "@/components/form/FormFieldWrapper";
import QuoteItemsTable from "./QuoteItemsTable";
import CustomerLookup from "@/components/customers/lookups/CustomerLookup";
import { FormInputDate } from "@/components/form/FormInputDate";
import FormSelect from "@/components/form/FormSelect";
import { BillingPeriods, LifeCycleTypes, PaymentForms, PaymentMethods, QuoteStatuses } from "../entity/quote.enum";
import QuoteItemAdd from "./QuoteItemAdd";
import { FormCard } from "@/components/form/FormCard";
import { FormStepProgress } from "@/components/form/FormStepProgress";
import { CheckCircle, Pencil, Send, XCircle } from "lucide-react";
import QuoteTotalDisplay from "./QuoteTotalDisplay";
import { useEffect, useState } from "react";

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

  const quoteStatus = form.getValues('status'); // Pode ser "draft", "pending", "approved", "rejected"

  const steps = [
    {
      label: 'Em elaboração',
      icon: <Pencil size={24} />,
      color: '#6B7280', // Cinza
      date: '11/05/2025',
      current: quoteStatus === QuoteStatuses.DRAFT.value,
    },
    {
      label: 'Aguardando aprovação',
      icon: <Send size={24} />,
      color: '#F59E0B', // Amarelo
      current: quoteStatus === QuoteStatuses.SENT.value,
    },
  ];
  
  if (quoteStatus === "rejected") {
    steps.push({
      label: "Reprovado",
      icon: <XCircle size={24} />,
      color: "#EF4444", // Vermelho
      current: quoteStatus === QuoteStatuses.REJECTED.value,
    });
  } else {
    steps.push({
      label: "Aprovado",
      icon: <CheckCircle size={24} />,
      color: "#10B981", // Verde
      current: quoteStatus === QuoteStatuses.ACCEPTED.value,
    });
  }
  
  return (
    <>
      <FormCard className="w-full">
        <FormStepProgress steps={steps} />
      </FormCard>

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
      <FormCard>
        <FormSection
          title="Quais são os produtos e serviços?"          
          titleAction={!readOnly && <QuoteItemAdd onAdd={handleAddItem} />}
        >
          <QuoteItemsTable quoteItems={items} form={form} readOnly={readOnly} />
        </FormSection>
      </FormCard>
    </>
  );
}
