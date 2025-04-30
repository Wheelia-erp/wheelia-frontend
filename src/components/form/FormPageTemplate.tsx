'use client';

import { ReactNode } from 'react';
import { FormBreadcrumb } from '@/components/form/FormBreadcrumb';
import { FormLoadingOverlay } from '@/components/form/FormLoadingOverlay';

interface FormPageTemplateProps {
  title: string;  
  breadcrumbItems?: {
    label: string;
    href?: string;
  }[];
  children: ReactNode;
  actions?: ReactNode;
  loading?: boolean;
  isViewing?: boolean;
  isEditing?: boolean;
  readOnly?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function FormPageTemplate({
  title,
  breadcrumbItems,
  children,
  actions,
  loading = false,  
  isEditing,    
  readOnly,
  onSubmit,
}: FormPageTemplateProps) {
  const contextTitle =
    !readOnly && isEditing
      ? "Editar"
      : readOnly && !isEditing
      ? "Visualizar"
      : "Cadastrar";
  return (
    <form onSubmit={onSubmit} className="h-full">
      <div className="relative min-h-screen flex flex-col">
        <FormLoadingOverlay loading={loading} />

        {/* Cabeçalho */}
        <div className="px-6 py-4 border-b space-y-2">
          {breadcrumbItems && <FormBreadcrumb items={breadcrumbItems} />}
          <h1 className="text-2xl font-bold">{contextTitle + " " + title}</h1>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">{children}</div>

        {/* Rodapé fixo */}
        {actions && (
          <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-2 shadow-md">
            {actions}
          </div>
        )}
      </div>
    </form>
  );
}
