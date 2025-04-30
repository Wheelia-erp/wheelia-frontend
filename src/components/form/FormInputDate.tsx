import { Controller } from 'react-hook-form';
import { FormInput } from './FormInput';

interface Props {
  name: string;
  label?: string;
  disabled?: boolean;
  control?: any;
}

export function FormInputDate({ name, label, disabled, control }: Props) {  

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const formatted =
          typeof field.value === 'string'
            ? field.value.split('T')[0]
            : field.value instanceof Date
            ? field.value.toISOString().split('T')[0]
            : '';

        return (
          <div className="space-y-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            <FormInput
              type="date"
              {...field}
              value={formatted}
              disabled={disabled}
            />
          </div>
        );
      }}
    />
  );
}
