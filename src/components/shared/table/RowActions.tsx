'use client';

import { MoreVertical } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { ReactNode, MouseEvent } from 'react';

interface RowActionsProps {
  children: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onOpenClick?: (e: MouseEvent) => void;
}

export function RowActions({ children, onOpenClick }: RowActionsProps) {
  return (
    <Popover>
      <PopoverTrigger
        onClick={(e) => {
          e.stopPropagation();
          onOpenClick?.(e);
        }}
        className="p-2 rounded-md hover:bg-gray-100 transition"
      >
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-36 p-1.5 text-sm font-normal"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
