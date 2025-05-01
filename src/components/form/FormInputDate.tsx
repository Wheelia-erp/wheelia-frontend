import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { FormInput } from './FormInput';

interface FormInputDateProps {
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function FormInputDate({
  name,
  label,
  className,
  disabled = false,
}: FormInputDateProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}

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
            <FormInput
              type="date"
              {...field}
              value={formatted}
              disabled={disabled}
              className={cn(className, errorMessage && 'border-red-500')}
            />
          );
        }}
      />

      {errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
