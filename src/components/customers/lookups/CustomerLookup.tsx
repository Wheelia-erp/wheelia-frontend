import { CustomerEntity } from '@/app/customers/entity/customer.entity';
import LookupAutoComplete from '@/components/shared/lookup/LookupAutoComplete';
import React, { useEffect } from 'react';
import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';

interface CustomerLookupProps {
  name: string;
  placeholder?: string;
  id?: string;
  initialValue?: { id: string; name: string };  
  // eslint-disable-next-line no-unused-vars
  onSelect?: (item: CustomerEntity) => void;
  required?: boolean;
  validation?: RegisterOptions;  
}

const CustomerLookup: React.FC<CustomerLookupProps> = ({
  name,
  placeholder,
  initialValue,
  id,
  required = false,  
  validation,
  onSelect,
}) => {
  const { setValue, control, register } = useFormContext();
  const selectedValue = useWatch({ control, name }) || '';

  useEffect(() => {
    if (initialValue && !selectedValue) {
      setValue(name, initialValue.id);
    }
  }, [initialValue, name, selectedValue, setValue]);

  const handleSelect = (customer: CustomerEntity) => {
    setValue(name, customer?.id, { shouldValidate: true, shouldDirty: true });
    if (onSelect && initialValue) {
      onSelect(customer);
    }
  };

  return (
    <>
      <input
        type="hidden"
        {...register(name, {
          required: required ? 'Selecione um cliente' : false,
          ...validation,
        })}
      />
      <LookupAutoComplete
        apiUrl="/customers"
        searchParamName="q"
        displayField="name"
        valueField="id"   
        id={id}
        placeholder={placeholder || 'Buscar cliente...'}
        initialValue={initialValue?.id}
        initialDisplayValue={initialValue?.name || ''}
        onSelect={handleSelect}
        noResultsText="Nenhum cliente encontrado"
        loadingText="Carregando clientes..."
        minSearchChars={2}
        debounceTimeout={300}
      />
    </>
  );
};

export default CustomerLookup;