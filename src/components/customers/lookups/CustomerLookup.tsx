import React, { useEffect } from 'react';
import { CustomerEntity } from '@/app/customers/entity/customer.entity';
import Lookup from '@/components/shared/lookup/Lookup';
import { useFormContext } from 'react-hook-form';

interface CustomerLookupProps {
  name: string;
  placeholder?: string;
  initialValue?: { id: string; name: string }; // ID e Nome do cliente inicial
  // eslint-disable-next-line no-unused-vars
  onSelect?: (item: CustomerEntity) => void;
}

const CustomerLookup: React.FC<CustomerLookupProps> = ({ name, placeholder, initialValue, onSelect }) => {
  const [initialLabel, setInitialLabel] = React.useState<string>('');
  const { setValue } = useFormContext();

  useEffect(() => {
    if (initialValue) {
      setInitialLabel(initialValue.name);
      setValue(name, initialValue.id);
    }
  }, [initialValue, name, setValue]);

  const handleSelect = (item: CustomerEntity) => {
    if (onSelect) onSelect(item);    
    setInitialLabel(item.name);
    setValue(name, item.id);
  };

  return (
    <Lookup
      name={name}
      endpoint="/customers/lookup/search"
      placeholder={placeholder || 'Buscar cliente...'}
      onSelect={handleSelect}
      key={initialLabel}
    />
  );
};

export default CustomerLookup;
