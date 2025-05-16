import React, { useState, useEffect } from 'react';
import backendApi from '@/lib/backendApi';
import { useFormContext, useWatch } from 'react-hook-form';
import Select, { SingleValue } from 'react-select';

interface LookupSelectProps {
  endpoint: string;
  placeholder?: string;
  name: string;
  initialValue?: { id: string; name: string };
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onSelect?: (item: any) => void;
}

const LookupSelect: React.FC<LookupSelectProps> = ({ endpoint, placeholder, name, initialValue, onSelect }) => {
  const { setValue, control } = useFormContext();
  const selectedValue = useWatch({ control, name }) || '';
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initialValue && !selectedValue) {
      setValue(name, initialValue.id);
      setOptions([{ value: initialValue.id, label: initialValue.name }]);
    }
  }, [initialValue, selectedValue, name, setValue]);

  const fetchOptions = async (query: string) => {
    setLoading(true);
    try {
      const response = await backendApi.get(`${endpoint}?q=${encodeURIComponent(query)}`);
      const formattedOptions = response.data
        .filter((item: any) => item && typeof item.name === 'string' && typeof item.id !== 'undefined')
        .slice(0, 10)
        .map((item: any) => ({
          value: String(item.id),
          label: String(item.name).trim()
        }));

      setOptions(formattedOptions);
    } catch (error) {
      console.error('Error fetching options:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (inputValue: string) => {
    if (inputValue.length >= 2) {
      fetchOptions(inputValue);
    }
  };

  const handleChange = (selected: SingleValue<{ value: string; label: string }>) => {
    if (selected) {
      setValue(name, selected.value);
      if (onSelect) onSelect(selected);
    } else {
      setValue(name, '');
    }
  };

  return (
    <Select
      placeholder={placeholder || 'Buscar...'}
      value={selectedValue ? { value: selectedValue, label: options.find(opt => opt.value === selectedValue)?.label || '' } : null}
      options={options}
      isLoading={loading}
      isClearable
      isSearchable
      onInputChange={handleInputChange}
      onChange={handleChange}
      classNamePrefix="react-select"
      className="w-full"
      filterOption={(option) => typeof option.label === 'string'}
      styles={{ menu: (provided) => ({ ...provided, zIndex: 1000 }) }}
    />
  );
};

export default LookupSelect;
