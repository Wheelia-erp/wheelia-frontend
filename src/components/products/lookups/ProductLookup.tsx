import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ProductEntity } from '@/app/products/entity/product.entity';
import LookupAutoComplete from '@/components/shared/lookup/LookupAutoComplete';

interface ProductLookupProps {
  name: string; // Name of the field in react-hook-form
  placeholder?: string;
  initialValue?: { id: string; name: string }; // Used to set initial display and form value if provided
  // eslint-disable-next-line no-unused-vars
  onSelect?: (item: ProductEntity | null) => void; // Callback with the full selected product or null
}

const ProductLookup: React.FC<ProductLookupProps> = ({ name, placeholder, initialValue, onSelect }) => {  
  const { setValue, control } = useFormContext();
  // useWatch is to observe the form value, which should be the ID
  const watchedFormValue = useWatch({ control, name }) || '';  

  useEffect(() => {
    // Set initial form value if provided and not already set
    if (initialValue && !watchedFormValue) {
      setValue(name, initialValue.id);
    }
    // Note: The LookupAutoComplete's internal state for searchTerm will be set by its own initialDisplayValue prop.
  }, [initialValue, name, setValue, watchedFormValue]);

  // This function is called by LookupAutoComplete's onSelect
  // It now receives the full 'selectedProduct' object or null
  const handleSelect = (selectedProduct: ProductEntity | null) => {
    if (selectedProduct) {
      setValue(name, selectedProduct.id); // Update the form field with the product's ID
      if (onSelect) {
        onSelect(selectedProduct); // Pass the full ProductEntity object upwards
      }
    } else {
      // Handle deselection or if LookupAutoComplete calls onSelect(null)
      setValue(name, null);
      if (onSelect) {
        onSelect(null);
      }
    }
  };

  return (    
    <LookupAutoComplete
      apiUrl="/products"
      searchParamName="q"
      displayField="name" // Field from ProductEntity to display in suggestions
      valueField="id"     // Field from ProductEntity to use as the key (still useful for <li key...)
      placeholder={placeholder || 'Buscar produto...'}
      // initialValue for LookupAutoComplete is the ID for its internal state if needed for initial selection
      initialValue={initialValue?.id} 
      initialDisplayValue={initialValue?.name || ''} // What's shown in the input initially
      onSelect={handleSelect} // This now expects the full ProductEntity or null
      noResultsText="Nenhum produto encontrado"
      loadingText="Carregando produtos..."
      minSearchChars={2}
      debounceTimeout={300}
      // Ensure your ProductEntity has 'id' and 'name' fields, 
      // and any other fields QuoteItemAdd might need (e.g., price)
    />
  );
};

export default ProductLookup;

