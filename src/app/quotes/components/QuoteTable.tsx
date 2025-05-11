'use client';

import { QuoteEntity } from "../entity/quote.entity";
import GenericTable from "@/components/shared/table/GenericTable";
import { currencyFormat, formatDate, getLabelByValue } from "@/lib/utils";
import { ConfirmDeleteDialog } from "@/components/shared/dialogs/ConfirmDeleteDialog";
import { QuoteStatuses } from "../entity/quote.enum";
import { useState } from "react";
import { RowActions } from "@/components/shared/table/RowActions";


interface QuoteTableProps {
  quotes: QuoteEntity[];
  loading?: boolean;
  page: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  // eslint-disable-next-line no-unused-vars
  onPageSizeChange: (size: number) => void;
  // eslint-disable-next-line no-unused-vars
  onEdit: (quote: QuoteEntity) => void;
  // eslint-disable-next-line no-unused-vars
  onView: (quote: QuoteEntity) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (quote: QuoteEntity) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeStatus: (quote: QuoteEntity) => void; 
}

export default function QuoteTable(props: QuoteTableProps) {
  const { quotes, loading, page, pageSize, totalItems, hasNextPage, hasPreviousPage, onNextPage, onPreviousPage, onPageSizeChange, onEdit, onView, onDelete } = props;  
  
  const [selected, setSelected] = useState(false);

  const handleClick = (quote: QuoteEntity) => {
    setSelected(true);
    onView(quote);
  };

  return (
    <GenericTable
      selected={selected}
      loading={loading}
      columns={[
        { label: '#Id', field: 'code' },
        {
          label: 'Cliente',
          field: 'customer',
          format: (customer: any) => customer.document + ' - ' + customer.name,
        },
        {
          label: 'Valor',
          field: 'total',
          format: (total: string) => currencyFormat(total),
        },
        {
          label: 'Validade',
          field: 'expirationDate',
          format: (validityDate: string) => formatDate(validityDate),
        },
        {
          label: 'Status',
          field: 'status',
          format: (status: string) => getLabelByValue(QuoteStatuses, status),
        },
      ]}
      data={quotes}
      page={page}
      pageSize={pageSize}
      totalItems={totalItems}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
      onPageSizeChange={onPageSizeChange}
      onRowClick={handleClick}
      actions={(quote) => (
        <RowActions>
          <button
            className="w-full px-3 py-2 rounded-md hover:bg-gray-50 text-left"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(quote);
            }}
          >
            Editar
          </button>
          <ConfirmDeleteDialog
            onConfirm={() => onDelete(quote)}
            trigger={
              <button
                className="w-full px-3 py-2 rounded-md hover:bg-red-50 text-left text-red-600"
                onClick={(e) => e.stopPropagation()}
              >
                Excluir
              </button>
            }
            title="Excluir orçamento"
            description={`Tem certeza que deseja excluir ${quote.customerId}?\nEsta ação não poderá ser desfeita.`}
          />
        </RowActions>
      )}
    />
  );
}