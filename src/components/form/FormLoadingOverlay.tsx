'use client';

import { Loader2 } from 'lucide-react'; // ícone de loading bonito
import { cn } from '@/lib/utils'; // caso você tenha o utilitário de classnames (senão podemos simplificar)

interface FormLoadingOverlayProps {
  loading: boolean;
}

export function FormLoadingOverlay({ loading }: FormLoadingOverlayProps) {
  if (!loading) return null;

  return (
    <div className={cn(
      'absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50',
    )}>
      <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
    </div>
  );
}
