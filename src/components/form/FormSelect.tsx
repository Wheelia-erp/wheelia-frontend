'use client';

import { forwardRef } from 'react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(({ className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`border rounded-md px-3 py-2 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${className ?? ''}`}
      {...props}
    />
  );
});

FormSelect.displayName = 'FormSelect';
