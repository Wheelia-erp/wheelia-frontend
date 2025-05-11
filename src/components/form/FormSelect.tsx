import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// Tipo genérico para garantir que os enums tenham value e label
interface EnumOption {
  value: string | number;
  label: string;
}

interface FormSelectProps {
  name: string;
  options?: EnumOption[];
  enumSource?: Record<string, EnumOption>; // Enum garantindo o formato de value e label
  placeholder?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ name, options, enumSource, placeholder }) => {
  const { register, setValue } = useFormContext();
  const [enumOptions, setEnumOptions] = useState<EnumOption[]>([]);

  useEffect(() => {
    if (enumSource) {
      const enumValues = Object.values(enumSource).map((item) => ({
        label: item.label,
        value: item.value,
      }));
      setEnumOptions(enumValues);
    }
  }, [enumSource]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(name, event.target.value);
  };

  return (
    <div className="relative">
      <select
        {...register(name)}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"        
      >
        {placeholder && <option value="">{placeholder}</option>}
        {(options || enumOptions).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
