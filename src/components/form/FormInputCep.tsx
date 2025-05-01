'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { MaskedInput } from './MaskedInput';
import { Loader2 } from 'lucide-react';

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
  const { control, watch, setValue, setError, clearErrors } = useFormContext();
  const cep = watch(name);
  const lastFetchedCep = useRef<string | null>(null);
  const abortController = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cleanCep = cep?.replace(/\D/g, '');

    if (!cleanCep || cleanCep.length !== 8 || cleanCep === lastFetchedCep.current) return;

    abortController.current?.abort();
    const controller = new AbortController();
    abortController.current = controller;

    const fetchAddress = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`, {
          signal: controller.signal,
        });
        const data = await res.json();
        lastFetchedCep.current = cleanCep;

        if (data.erro) {
          setError(name, { type: 'manual', message: 'CEP não encontrado.' });
          setValue('address', '');
          setValue('neighborhood', '');
          setValue('city', '');
          setValue('state', '');
          setValue('country', '');
          return;
        }

        clearErrors(name);
        setValue('address', data.logradouro || '');
        setValue('neighborhood', data.bairro || '');
        setValue('city', data.localidade || '');
        setValue('state', data.uf || '');
        setValue('country', 'Brasil' );
      } catch (error : Error | any) {
        if (error.name !== 'AbortError') {
          setError(name, {
            type: 'manual',
            message: 'Erro ao buscar o CEP.',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [cep, name, setValue, setError, clearErrors]);

  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MaskedInput
            {...field}
            mask="cep"
            disabled={disabled || loading}
            placeholder={placeholder ?? '99.999-999'}
            className="pr-10" // espaço para o spinner
          />
        )}
      />

      {loading && (
        <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
      )}
    </div>
  );
}
