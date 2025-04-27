'use client';

import { Skeleton } from '@/components/ui/skeleton'; // shadcn skeleton (se ainda não adicionou: npx shadcn-ui@latest add skeleton)

interface FormSkeletonProps {
  fields: number;
}

export function FormSkeleton({ fields }: FormSkeletonProps) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, idx) => (
        <div key={idx} className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}
