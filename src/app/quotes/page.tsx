'use client';

import AppShell from '@/components/layout/AppShell';
import { FilterValue, useCrud } from '@/hooks/crud/useCrud';
import { useState } from 'react';
import { QuoteEntity } from './entity/quote.entity';
import { QuoteFormDto } from './dto/quote-form.dto';
import { useApiErrorToast } from '@/hooks/crud/useApiErrorToast';
import { sanitizeForm } from '@/lib/utils';
import { toast } from 'sonner';
import { FilterField, FilterSheetWrapper } from '@/components/shared/forms/FilterSheetWrapper';
import { FormButton } from '@/components/form/FormButton';
import { QuoteFormWrapper } from './components/QuoteFormWrapper';
import QuoteTable from './components/QuoteTable';

export default function QuotesPage() {
  const [filters, setFilters] = useState<Record<string, FilterValue>>({});

  const {
    items: quotes,
    itemBeingEdited,
    isViewing,
    isEditing,
    isFormOpen,
    loading,
    page,
    pageSize,
    totalItems,
    hasNextPage,
    hasPreviousPage,
    setPage,
    setPageSize,
    onNextPage,
    onPreviousPage,
    openForm,
    cancelForm,
    onView,
    onEdit,      
    remove,
    update,
    create,
    changeStatus,

  } = useCrud<QuoteEntity, QuoteFormDto>({
    endpoint: "/quotes",
    filters,
  });

  const { show: showError } = useApiErrorToast();

  const handleSubmit = async (data: QuoteEntity) => {        
    try {
        const dataToSave = sanitizeForm(new QuoteFormDto(data));       
        if (itemBeingEdited) {        
            await update(itemBeingEdited.id, dataToSave);
            toast.success('Orçamento atualizado com sucesso!');
        } else {
            await create(dataToSave);
            toast.success('Orçamento criado com sucesso!');
        }
        cancelForm();
    } catch (err) {
        showError(err);
    }
};

const handleDelete = async (quote: QuoteEntity) => {
  try {      
      await remove(quote.id);
      toast.success('Orçamento excluído com sucesso!');
  } catch (err) {
      showError(err);
  }
};

const handleStatusChange = async (quote: QuoteEntity) => {
  try {         
      await changeStatus(quote.id);
      toast.success("Status do orçamento foi alterado com sucesso!");
  } catch (err) {
      showError(err);
  }
};

const filterFields: FilterField[] = [
  { name: 'name', label: 'Nome', type: 'text' },
  { name: 'code', label: 'Codigo', type: 'text' },
  { name: 'isActive', label: 'Ativo', type: 'boolean' },      
];

return (
  <AppShell>
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Orçamentos</h1>
            <div className="flex gap-2">
            {!isFormOpen && (
              <FilterSheetWrapper
                fields={filterFields}
                filters={filters}
                onChange={(newFilters) => {
                  setFilters(newFilters);
                  setPage(1); 
                }}
              />
            )}
            {!isFormOpen && (
                <FormButton onClick={() => openForm()}>
                    Novo Orçamento
                </FormButton>
            )}
        </div>
      </div>
      {isFormOpen ? (
        <QuoteFormWrapper
            title='Orçamento'
            defaultValues={itemBeingEdited ?? undefined}
            isEditing={isEditing}
            readOnly={isViewing}
            onSubmit={handleSubmit}
            onCancel={cancelForm}
            loading={loading}
        />
      ) : (
        <QuoteTable
          quotes={quotes ?? []}
          loading={loading}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
          onEdit={onEdit}
          onView={onView}
          onDelete={handleDelete}
          onChangeStatus={handleStatusChange}
        />
      )}
    </div>
  </AppShell>
);
}
