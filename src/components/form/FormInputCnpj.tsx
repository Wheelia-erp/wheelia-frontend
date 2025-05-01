import { Controller, useFormContext } from 'react-hook-form';
import { MaskedInput } from './MaskedInput';

interface FormInputCnpjProps {
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function FormInputCnpj({
    name,        
    placeholder,
    disabled = false,    
}: FormInputCnpjProps) {
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
            mask="cnpj"
            disabled={disabled}
            placeholder={ placeholder ?? "00.000.000/0000-00"}
          />
        )}
      />
    </div>
  );
}
