import CustomerLookup from "@/components/customers/lookups/CustomerLookup";
import { FormButton } from "@/components/form/FormButton";
import { FormCard } from "@/components/form/FormCard";
import { FormFieldWrapper } from "@/components/form/FormFieldWrapper";
import { FormInputDate } from "@/components/form/FormInputDate";
import FormSelect from "@/components/form/FormSelect";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { QuoteEntity, QuoteItemEntity } from "../entity/quote.entity";
import { BillingPeriods, LifeCycleTypes, PaymentForms, PaymentMethods } from "../entity/quote.enum";
import QuoteItemModal from "./QuoteItemModal";
import QuoteItemsTable from "./QuoteItemsTable";
import QuoteStatusView from "./QuoteStatus";

interface QuoteFormProps {  
  readOnly?: boolean;
  form: ReturnType<typeof useForm<QuoteEntity>>;    
}

export default function QuoteForm({ readOnly, form }: QuoteFormProps) {
  const items = useWatch({ control: form.control, name: 'items' }) ?? [];
  items.forEach(item => {item.tempId = item.id});

  const [isQuoteItemModalOpen, setIsQuoteItemModalOpen] = useState(false);
  const [editingQuoteItem, setEditingQuoteItem] = useState<QuoteItemEntity | null>(null);

  const handleOpenQuoteItemModal = (item?: QuoteItemEntity) => {
    setEditingQuoteItem(item || null);
    setIsQuoteItemModalOpen(true);
  };

  const handleCloseQuoteItemModal = () => {
    setIsQuoteItemModalOpen(false);
    setEditingQuoteItem(null);
  };

  const handleQuoteItemSubmit = (submittedItem: QuoteItemEntity) => {
    const currentItems = form.getValues('items') || [];
    currentItems.forEach(item => {item.tempId = item.id});
    let newItems;
   
    const itemWithTempId = {
      ...submittedItem,
      quoteId: form.getValues('id'), 
      tempId: submittedItem.id || editingQuoteItem?.id || crypto.randomUUID(),
    };


    if (editingQuoteItem) { 
      const itemIndex = currentItems.findIndex(it => it.tempId === editingQuoteItem.tempId);
      if (itemIndex >= 0) {
        newItems = [...currentItems];
        newItems[itemIndex] = itemWithTempId;
      } else {        
        newItems = [...currentItems, itemWithTempId];
      }
    } else { 
      newItems = [...currentItems, itemWithTempId];
    }
    
    form.setValue('items', newItems, { shouldValidate: true, shouldDirty: true });
    handleCloseQuoteItemModal();
  };

  const handleDeleteQuoteItem = (itemToDelete: QuoteItemEntity) => {
    const currentItems = form.getValues('items') || [];
    currentItems.forEach(item => {item.tempId = item.id});
    const newItems = currentItems.filter(item => item.tempId !== itemToDelete.tempId);
    form.setValue('items', newItems, { shouldValidate: true, shouldDirty: true });
  };

  useEffect(() => {
    const totalValue = items.reduce(
      (acc, item) => acc + (item.quantity * item.unitPrice - item.discount) ,
      0
    );
    if (totalValue !== form.getValues('total')) {
      form.setValue('total', totalValue, { shouldValidate: true, shouldDirty: true });    
    }
  }, [items]);
    
  return (
    <>
      <QuoteStatusView quoteStatus={form.getValues('status')} />

      <FormCard title="Para Quem e Sobre o Quê?">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormFieldWrapper
            label="Para quem é este orçamento?"
            required={!readOnly}
            className="col-span-2"
            error={form.formState.errors.customerId?.message}
          >
            <CustomerLookup
              name="customerId"
              initialValue={{
                id: form.getValues('customerId'),
                name: form.getValues('customer.name'),
              }}
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
        titleAction={
          !readOnly && (
            <FormButton
              type="button"              
              onClick={() => handleOpenQuoteItemModal()}
            >
              Adicionar Item
            </FormButton>
          )
        }
      >
        <QuoteItemsTable
          quoteItems={items}
          form={form}
          readOnly={readOnly}
          onEditItem={(item) => handleOpenQuoteItemModal(item)}
          onDeleteItem={(item) => handleDeleteQuoteItem(item)}
        />
      </FormCard>
      {!readOnly && (
        <QuoteItemModal
          isOpen={isQuoteItemModalOpen}
          onClose={handleCloseQuoteItemModal}
          onSubmit={handleQuoteItemSubmit}
          itemToEdit={editingQuoteItem}
        />
      )}
    </>
  );
}
