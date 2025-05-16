'use client';

import { ReactNode } from 'react';
import { FormBreadcrumb } from '@/components/form/FormBreadcrumb';
import { FormLoadingOverlay } from '@/components/form/FormLoadingOverlay';

interface FormPageTemplateProps {
  title: string;
  identifier?: string;
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
  identifier,
  breadcrumbItems,
  children,
  actions,
  loading = false,  
  // eslint-disable-next-line no-unused-vars
  isEditing,    
  // eslint-disable-next-line no-unused-vars
  readOnly,
  onSubmit,
}: FormPageTemplateProps) {
  
  return (
    <form onSubmit={onSubmit} className="h-full">
      <div className="relative min-h-screen flex flex-col">
        <FormLoadingOverlay loading={loading} />

        {/* Cabeçalho */}
        <div className="sticky top-16 bg-white border-t p-4 gap-2 shadow-md border-b z-10">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <h1 className="text-2xl font-bold">{title}</h1>
              <h1 className="text-2xl text-gray-500">{identifier}</h1>
            </div>
            {breadcrumbItems && <FormBreadcrumb items={breadcrumbItems} />}
          </div>
          <div className="text-gray-400 italic text-1x1 text-sm">
            Criado em {new Date().toLocaleDateString('pt-BR')} e atualizado em{' '}
            {new Date().toLocaleDateString('pt-BR')}
          </div>
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
