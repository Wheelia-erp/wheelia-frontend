import { forwardRef } from 'react';
import { cn } from '@/lib/utils'; 
import { FormInput } from './FormInput';

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: 'cep' | 'cpf' | 'cnpj' | 'phone';
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, onChange, className, value, ...props }, ref) => {
    const applyMask = (raw: string) => {
      const numbers = raw.replace(/\D/g, '');
      if (mask === 'cep') {
        return numbers.replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
      }
      if (mask === 'cpf') {
        return numbers
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .slice(0, 14);
      }
      if (mask === 'cnpj') {
        return numbers
          .replace(/^(\d{2})(\d)/, '$1.$2')
          .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
          .replace(/\.(\d{3})(\d)/, '.$1/$2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .slice(0, 18);
      }
      if (mask === 'phone') {
        return numbers.length <= 10
          ? numbers.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2').slice(0, 14)
          : numbers.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 15);
      }
      return raw;
    };

    const handleMaskedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const masked = applyMask(raw);
      const event = {
        ...e,
        target: {
          ...e.target,
          value: masked,
        },
      };
      onChange?.(event);
    };

    return (
      <FormInput
        {...props}
        ref={ref}
        value={value ?? ''}
        onChange={handleMaskedChange}
        className={cn(className)}
      />
    );
  }
);
