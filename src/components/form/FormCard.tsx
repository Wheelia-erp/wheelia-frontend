import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  titleAction?: ReactNode;
  children: ReactNode;
}

export const FormCard: React.FC<FormCardProps> = ({ title, titleAction, children, className, ...props }) => {
  return (
    <div className={cn("bg-white shadow-sm rounded-lg p-4 mt-2 mb-0", className)} {...props}>
      <div className="flex justify-between items-center pb-4">
        {title && <h3 className="text-xl font-semibold text-gray-800">{title}</h3>}
        {titleAction && <div className="flex items-center gap-2">{titleAction}</div>}
      </div>      
      <div>{children}</div>
    </div>
  );
};
