import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function FormInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      className={cn(
        'w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition',
        (props.disabled || props.readOnly) && 'bg-gray-100 text-gray-600 cursor-not-allowed',
        props.className
      )}
    />
  );
}
