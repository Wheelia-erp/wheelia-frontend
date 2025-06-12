'use client';

import { ConfirmDeleteDialog } from "@/components/shared/dialogs/ConfirmDeleteDialog";
import GenericTable from "@/components/shared/table/GenericTable";
import { currencyFormat, formatDate } from "@/lib/utils";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { QuoteEntity } from "../entity/quote.entity";
import { formatQuoteId } from "../util/quote-util";


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
        { label: '#Id', field: 'code', format: (code: string) => formatQuoteId(code) },
        {
          label: 'Cliente',
          field: 'customer',
          format: (customer: any) => customer.name,
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
          format: (status: string) => {            
            switch (status) {
              case 'draft': return (<span className="text-gray-500">Rascunho</span>)
              case 'sent': return (<span className="text-blue-500">Enviado</span>)
              case 'accepted': return (<span className="text-green-500">Aceito</span>)  
              case 'rejected': return (<span className="text-red-500">Rejeitado</span>)
              case 'cancelled': return (<span className="text-red-500">Cancelado</span>)
              case 'expired': return (<span className="text-red-500">Expirado</span>)
              default: return (<span className="text-gray-500">Desconhecido</span>)
            }            
          },
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
        <div className="flex items-initial justify-initial">
          <button
            className="flex items-center p-1  text-left text-sm cursor-pointer hover:bg-blue-50"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(quote);
            }}
          >
            <Edit2Icon className="h-4 w-4" />
          </button>
          <ConfirmDeleteDialog
            onConfirm={() => onDelete(quote)}
            trigger={
              <button
                className="flex items-center pl-3 p-1 text-left text-red-600 text-sm cursor-pointer hover:bg-blue-50"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2Icon className="h-4 w-4" />
              </button>
            }
            title="Excluir orçamento"
            description={`Tem certeza que deseja excluir ${formatQuoteId(quote.code)}?\nEsta ação não poderá ser desfeita.`}
          />
        </div>
      )}
    />
  );
}