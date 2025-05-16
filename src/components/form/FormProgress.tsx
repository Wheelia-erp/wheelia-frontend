// src/components/ui/FormProgress.tsx
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FormProgressProps {
  value: number;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const FormProgress: React.FC<FormProgressProps> = ({ value, max = 100, className, style }) => {
  return (
    <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", className)} style={style}>
      <div 
        className="h-2 rounded-full transition-all"
        style={{
          width: `${(value / max) * 100}%`,
          backgroundColor: style?.backgroundColor ?? "#3182CE"
        }}
      />
    </div>
  );
};
