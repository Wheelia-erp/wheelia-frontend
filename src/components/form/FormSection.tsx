'use client';

import { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  titleAction?: ReactNode;
  children: ReactNode;
}

export function FormSection({ title, children, titleAction }: FormSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {titleAction && <div className="flex items-center gap-2">{titleAction}</div>}
      </div>
      {children}
    </section>
  );
}


