import { Controller, useFormContext } from 'react-hook-form';
import { FormInput } from './FormInput';

interface FormInputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormInputText({
    name,        
    placeholder,
    disabled = false,    
}: FormInputTextProps) {
  const {    
    control,    
  } = useFormContext(); 

  return (
    <div className="space-y-1">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormInput
            {...field}            
            disabled={disabled}
            placeholder={placeholder}
          />
        )}
      />
    </div>
  );
}
