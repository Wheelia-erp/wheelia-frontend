import React, { useEffect } from 'react';
import { CustomerEntity } from '@/app/customers/entity/customer.entity';
import { useFormContext, useWatch } from 'react-hook-form';
import LookupAutoComplete from '@/components/shared/lookup/LookupAutoComplete';

interface CustomerLookupProps {
  name: string;
  placeholder?: string;
  initialValue?: { id: string; name: string };
  // eslint-disable-next-line no-unused-vars
  onSelect?: (item: CustomerEntity) => void;
}

const CustomerLookup: React.FC<CustomerLookupProps> = ({ name, placeholder, initialValue, onSelect }) => {
  const { setValue, control } = useFormContext();
  const selectedValue = useWatch({ control, name }) || '';

  useEffect(() => {
    if (initialValue && !selectedValue) {
      setValue(name, initialValue.id);
    }
  }, [initialValue, name, setValue]);

  const handleSelect = (customer: CustomerEntity) => {
    setValue(name, customer.id);
    if (onSelect && initialValue) {      
      onSelect(customer);
    }
  };

  return (
    <LookupAutoComplete
      apiUrl="/customers"
      searchParamName="q"
      displayField="name"
      valueField="id"
      placeholder={placeholder || 'Buscar cliente...'}
      initialValue={initialValue?.id}
      initialDisplayValue={initialValue?.name || ''}
      onSelect={handleSelect}
      noResultsText="Nenhum cliente encontrado"
      loadingText="Carregando clientes..."
      minSearchChars={2}
      debounceTimeout={300}
    />
  );
};

export default CustomerLookup;