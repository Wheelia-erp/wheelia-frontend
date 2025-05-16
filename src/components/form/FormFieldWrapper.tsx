'use client';

import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormFieldWrapperProps {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  error?: string | FieldError;
  description?: string;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
}

export function FormFieldWrapper({
  label,
  htmlFor,
  children,
  error,
  description,
  required,
  readOnly,
  className
}: FormFieldWrapperProps) {
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <div className={cn("space-y-1 ", className)}>
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
