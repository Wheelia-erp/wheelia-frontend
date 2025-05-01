import { Controller, useFormContext } from 'react-hook-form';
import { MaskedInput } from './MaskedInput';

interface FormInputPhoneProps {
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function FormInputPhone({
    name,        
    placeholder,
    disabled = false,    
}: FormInputPhoneProps) {
  const {    
    control,    
  } = useFormContext(); 

  return (
    <div className="space-y-1">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MaskedInput
            {...field}
            mask="phone"
            disabled={disabled}
            placeholder={placeholder ?? "(00) 00000-0000"}
          />
        )}
      />
    </div>
  );
}
