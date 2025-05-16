'use client';

import { ReactNode } from 'react';
import { FormCard } from './FormCard';

interface FormSectionProps {
  title: string;
  titleAction?: ReactNode;
  children: ReactNode;
}

export function FormSection({ title, children, titleAction }: FormSectionProps) {
  return (
    <FormCard title={title} titleAction={titleAction} >
      {children}
    </FormCard>
  );
}
    

