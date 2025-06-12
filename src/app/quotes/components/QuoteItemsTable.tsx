'use client';

import { ConfirmDeleteDialog } from "@/components/shared/dialogs/ConfirmDeleteDialog";
import GenericTable from "@/components/shared/table/GenericTable";
import { currencyFormat } from "@/lib/utils";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { QuoteEntity, QuoteItemEntity } from "../entity/quote.entity";

interface QuoteItemsTableProps {
  quoteItems: QuoteItemEntity[];
  loading?: boolean;  
  form?: ReturnType<typeof useForm<QuoteEntity>>;
  readOnly?: boolean;
  // eslint-disable-next-line no-unused-vars
  onEditItem?: (item: QuoteItemEntity) => void;
  // eslint-disable-next-line no-unused-vars
  onDeleteItem?: (item: QuoteItemEntity) => void;
}

export default function QuoteItemsTable(props: QuoteItemsTableProps) {
  const { quoteItems, loading, readOnly, onEditItem, onDeleteItem  } = props;    
  const [items, setItems] = useState<QuoteItemEntity[]>(quoteItems ?? []);

  useEffect(() => {
    setItems(quoteItems ?? []);
  }, [quoteItems]);

  return (
    <GenericTable<QuoteItemEntity>      
      loading={loading}
      data={items}
      columns={[
        {
          label: 'Código do produto',
          field: 'product',
          format: (product: { code: string; name: string }): string =>
            product.code + ' - ' + product.name,
        },
        { label: 'Descrição', field: 'description' },
        {
          label: 'Valor Unitário',
          field: 'unitPrice',
          format: (value: number): string => currencyFormat(value),
        },
        { label: 'Quantidade', field: 'quantity' },
        {
          label: 'Desconto',
          field: 'discount',
          format: (value: number): string => currencyFormat(value),
        },
        {
          label: 'Total',
          field: 'total',
          format: (value: number): string => currencyFormat(value),
        },
      ]}
      actions={
        readOnly
          ? undefined
          : (quoteItemRow: QuoteItemEntity): React.ReactNode => (
              <div className="flex items-center justify-center">
                {onEditItem && (
                  <button
                    type="button"                    
                    title="Editar item"
                    className="flex items-center p-1  text-left text-sm"
                    onClick={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ): void => {
                      e.stopPropagation();
                      onEditItem(quoteItemRow);
                    }}
                  >
                    <Edit2Icon className="h-4 w-4" />
                  </button>
                )}
                {onDeleteItem && (
                  <ConfirmDeleteDialog
                    onConfirm={(): void => {
                      onDeleteItem(quoteItemRow);
                    }}
                    trigger={
                      <button
                        type="button"                        
                        title="Excluir item do orçamento"
                        className="flex items-center pl-3 p-1 text-left text-red-600 text-sm"
                        onClick={(
                          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ): void => e.stopPropagation()}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </button>
                    }
                    title="Excluir Item do Orçamento"
                    description={`Tem certeza que deseja excluir o item "${
                      quoteItemRow.description || quoteItemRow.product?.name
                    }"?`}
                  />
                )}
              </div>
            )
      }
    />
  );
}