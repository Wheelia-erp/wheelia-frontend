'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // helper para juntar classes condicionalmente

export function FormButton(props: React.ComponentProps<typeof Button>) {
  const { className, variant, ...rest } = props;

  const isSecondary = variant === 'secondary';

  const baseClass = isSecondary
    ? 'bg-gray-100 hover:border-gray-400 text-gray-700 border border-gray-300 '
    : 'bg-blue-600 hover:bg-blue-700 text-white';

  return (
    <Button
      variant={variant}
      className={cn(
        baseClass,
        'px-5 py-2 rounded-xl shadow transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        className
      )}
      {...rest}
    />
  );
}
