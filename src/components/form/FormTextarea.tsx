'use client';

import { forwardRef } from 'react';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea      
      ref={ref}
      className={`border rounded-md px-3 py-2 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${className ?? ''}`}
      {...props}
    />
  );
});

FormTextarea.displayName = 'FormTextarea';
