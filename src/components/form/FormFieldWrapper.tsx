'use client';

import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { FieldError } from 'react-hook-form';

interface FormFieldWrapperProps {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  error?: string | FieldError;
  description?: string;
  required?: boolean;
  readOnly?: boolean;
}

export function FormFieldWrapper({
  label,
  htmlFor,
  children,
  error,
  description,
  required,
  readOnly,
}: FormFieldWrapperProps) {
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <div className="space-y-1">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-gray-700 block">
        {label}
        {!readOnly && required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {children}

      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}

      {!readOnly && errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
