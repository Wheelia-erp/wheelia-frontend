'use client';

import { ReactNode } from 'react';
import { FormBreadcrumb } from '@/components/form/FormBreadcrumb';
import { FormLoadingOverlay } from '@/components/form/FormLoadingOverlay';

interface FormPageTemplateProps {
  title: string;
  description?: string;
  breadcrumbItems?: {
    label: string;
    href?: string;
  }[];
  children: ReactNode;
  actions?: ReactNode;
  loading?: boolean;
}

export function FormPageTemplate({
  title,
  description,
  breadcrumbItems,
  children,
  actions,
  loading = false,
}: FormPageTemplateProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* FormLoadingOverlay cobrindo TUDO */}
      <FormLoadingOverlay loading={loading} />

      {/* Cabeçalho */}
      <div className="px-6 py-4 border-b space-y-2">
        {breadcrumbItems && (
          <FormBreadcrumb items={breadcrumbItems} />
        )}
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-gray-500 text-sm">{description}</p>}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {children}
      </div>

      {/* Rodapé fixo */}
      {actions && (
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-2 shadow-md">
          {actions}
        </div>
      )}
    </div>
  );
}
