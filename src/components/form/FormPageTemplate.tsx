'use client';

import { FormBreadcrumb } from '@/components/form/FormBreadcrumb';
import { FormLoadingOverlay } from '@/components/form/FormLoadingOverlay';
import { ChevronLeftIcon } from 'lucide-react';
import { ReactNode } from 'react';

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
  headerChildLeft?: ReactNode;
  headerChildRight?: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
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
  headerChildLeft,
  headerChildRight,
  onSubmit,
  onCancel,
}: FormPageTemplateProps) {
  
  return (
    <form onSubmit={onSubmit} className="h-full">
      <div className="relative min-h-screen flex flex-col">
        <FormLoadingOverlay loading={loading} />

        {/* Cabeçalho */}
        <div className="sticky top-16 bg-white border-t p-4 gap-2 rounded-lg shadow-sm border-b z-10">
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center gap-2">
              <button
                  type="button"
                  title="Voltar"
                  onClick={onCancel}>
                  <ChevronLeftIcon
                    className="h-8 w-8 cursor-pointer text-gray-500 hover:text-gray-700"
                  />
                </button>
              <div className="flex flex-col items-initial">
                <div className="flex items-end">
                  <div className="flex items-center gap-2">                 
                    <h1 className="text-2xl font-bold">{title}</h1>
                  </div>
                  <h1 className="text-3xl font-semibold text-gray-500 pl-4">
                    {identifier}
                  </h1>
                </div>
                {headerChildLeft ? <div>{headerChildLeft}</div> : null}
              </div>
            </div>
            <div className="flex flex-col items-end">
              {breadcrumbItems && <FormBreadcrumb items={breadcrumbItems} />}
              {headerChildRight ? <div>{headerChildRight}</div> : null}
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">{children}</div>

        {/* Rodapé fixo */}
        {actions && (
          <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-2 rounded-lg shadow-sm">
            {actions}
          </div>
        )}
      </div>
    </form>
  );
}
