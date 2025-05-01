import { Controller, useFormContext } from 'react-hook-form';
import { MaskedInput } from './MaskedInput';

interface FormInputCepProps {
  name: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function FormInputCep({
    name,    
    placeholder,    
    disabled = false,    
}: FormInputCepProps) {
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
            mask="cep"
            disabled={disabled}
            placeholder={placeholder ?? "99.999-999"}
          />
        )}
      />
    </div>
  );
}
