'use client';

import { ReactNode } from 'react';

interface FormErrorMessageProps {
  children: ReactNode;
}

export function FormErrorMessage({ children }: FormErrorMessageProps) {
  if (!children) return null;

  return (
    <p className="text-sm text-red-600">
      {children}
    </p>
  );
}
