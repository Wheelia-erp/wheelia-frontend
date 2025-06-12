import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function FormInput(props: React.ComponentProps<typeof Input>) {
  const { id, name, className, readOnly, disabled, ...rest } = props;

  return (
    <Input
      id={id ?? name}
      name={name}
      {...rest}
      className={cn(
        'w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition',
        (disabled || readOnly) && 'bg-gray-100 text-gray-600 cursor-not-allowed',
        className
      )}
    />
  );
}
