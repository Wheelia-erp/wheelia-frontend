'use client';

import { forwardRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormInput } from './FormInput';

type Props = React.ComponentProps<typeof Input> & {
  mask: 'cnpj' | 'phone' | 'cpf' | 'cep';
};

export const MaskedInput = forwardRef<HTMLInputElement, Props>(
  ({ mask, onChange, className, ...props }, ref) => {
    const [value, setValue] = useState('');

    const applyMask = (raw: string) => {
      const numbers = raw.replace(/\D/g, '');

      if (mask === 'cep') {
        return numbers
          .replace(/(\d{5})(\d)/, '$1-$2')
          .replace(/(-\d{3})\d+?$/, '$1');        
      }

      if (mask === 'cpf') {
        return numbers
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
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
          ? numbers
              .replace(/^(\d{2})(\d)/, '($1) $2')
              .replace(/(\d{4})(\d)/, '$1-$2')
              .slice(0, 14)
          : numbers
              .replace(/^(\d{2})(\d)/, '($1) $2')
              .replace(/(\d{5})(\d)/, '$1-$2')
              .slice(0, 15);
      }

      return raw;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const masked = applyMask(e.target.value);
      setValue(masked);
      onChange?.({ ...e, target: { ...e.target, value: masked } });
    };

    return (
      <FormInput
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
        className={cn(className)}
      />
    );
  }
);

MaskedInput.displayName = 'MaskedInput';
