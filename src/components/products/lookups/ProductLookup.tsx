import React, { useEffect } from 'react';
import Lookup from '@/components/shared/lookup/Lookup';
import { useFormContext } from 'react-hook-form';
import { ProductEntity } from '@/app/products/entity/product.entity';

interface ProductLookupProps {
  name: string;
  placeholder?: string;
  initialValue?: { id: string; name: string }; // ID e Nome do cliente inicial
  // eslint-disable-next-line no-unused-vars
  onSelect?: (item: ProductEntity) => void;
}

const ProductLookup: React.FC<ProductLookupProps> = ({ name, placeholder, initialValue, onSelect }) => {
  const [initialLabel, setInitialLabel] = React.useState<string>('');
  const { setValue } = useFormContext();

  useEffect(() => {
    if (initialValue) {
      setInitialLabel(initialValue.name);
      setValue(name, initialValue.id);
    }
  }, [initialValue, name, setValue]);

  const handleSelect = (item: ProductEntity) => {
    if (onSelect) onSelect(item);    
    setInitialLabel(item.name);
    setValue(name, item.id);
  };

  return (
    <Lookup
      name={name}
      endpoint="/products/lookup/search"
      placeholder={placeholder || 'Buscar produto...'}
      onSelect={handleSelect}
      key={initialLabel}
    />
  );
};

export default ProductLookup;
