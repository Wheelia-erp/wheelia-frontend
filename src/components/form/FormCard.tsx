import React from "react";
import { cn } from "@/lib/utils";

interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export const FormCard: React.FC<FormCardProps> = ({ title, children, className, ...props }) => {
  return (
    <div className={cn("bg-white shadow-sm rounded-lg p-4", className)} {...props}>
      {title && <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>}
      <div>{children}</div>
    </div>
  );
};
