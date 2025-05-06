'use client';

import TableRow from "@/components/shared/table/TableRow";
import { QuoteEntity } from "../entity/quote.entity";
import { cn, formatDate, getLabelByValue } from "@/lib/utils";
import TableCell from "@/components/shared/table/TableCell";
import { ConfirmDeleteDialog } from "@/components/shared/dialogs/ConfirmDeleteDialog";
import { RowActions } from "@/components/shared/table/RowActions";
import { useState } from "react";
import { QuoteStatuses } from "../entity/quote.enum";

export function QuoteTableRow({ quote, onEdit, onView, onDelete }: {
  quote: QuoteEntity,
  // eslint-disable-next-line no-unused-vars
  onEdit: (quote: QuoteEntity) => void;
  // eslint-disable-next-line no-unused-vars
  onView: (quote: QuoteEntity) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (quote: QuoteEntity) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeStatus: (quote: QuoteEntity) => void;
}) {

  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(true);
    onView(quote);
  };

  const yellowStatus = ['draft', 'sent'];
  const greenStatus = ['accepted', 'paid'];
  const redStatus = ['rejected', 'cancelled', 'expired'];

  return (
    <TableRow
      onClick={handleClick}
      className={cn(
        'cursor-pointer hover:bg-blue-50 transition',
        selected && 'bg-blue-100'
      )}
    >
      <TableCell>{quote.code}</TableCell>
      <TableCell>
        {quote.customer.document} - {quote.customer.name}
      </TableCell>
      <TableCell>{quote.total}</TableCell>
      <TableCell>{formatDate(quote.expirationDate)}</TableCell>
      <TableCell>
        <span
          className={cn(
            'inline-block px-2 py-1 text-xs rounded-full font-medium',
            yellowStatus.includes(quote.status)
              ? 'bg-yellow-100 text-yellow-700'
              : greenStatus.includes(quote.status)
                ? 'bg-green-100 text-green-700'
                : redStatus.includes(quote.status)
                  ? 'bg-red-100 text-red-700'
                  : 'text-gray-700'
          )}
        >
          {getLabelByValue(QuoteStatuses, quote.status)}
        </span>
      </TableCell>
      <TableCell align="right">
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
      </TableCell>
    </TableRow>
  );
}