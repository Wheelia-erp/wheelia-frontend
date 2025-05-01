import { Controller, useFormContext } from 'react-hook-form';
import { MaskedInput } from './MaskedInput';

interface FormInputCpfProps {
  name: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function FormInputCpf({
    name,        
    placeholder,
    disabled = false,    
}: FormInputCpfProps) {
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
            mask="cpf"
            disabled={disabled}
            placeholder={placeholder ?? "00.000.000-00"}
          />
        )}
      />
    </div>
  );
}
