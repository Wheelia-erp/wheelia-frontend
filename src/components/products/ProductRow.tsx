'use client';

import { useState } from 'react';
import TableRow from '@/components/shared/table/TableRow';
import TableCell from '@/components/shared/table/TableCell';
import { cn } from '@/lib/utils';
import { RowActions } from '@/components/shared/table/RowActions';
import { ConfirmDeleteDialog } from '@/components/shared/dialogs/ConfirmDeleteDialog';
import { ProductEntity } from '@/app/products/entity/product.entity';

export function ProductRow({
    product,
    onEdit,
    onView,
    onDelete,
    onChangeStatus,
}: {
    product: ProductEntity;
    // eslint-disable-next-line no-unused-vars
    onEdit: (product: ProductEntity) => void;
    // eslint-disable-next-line no-unused-vars
    onView: (product: ProductEntity) => void;
    // eslint-disable-next-line no-unused-vars
    onDelete: (product: ProductEntity) => void;
    // eslint-disable-next-line no-unused-vars
    onChangeStatus: (product: ProductEntity) => void;

}) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(true);
    onView(product);
  };

  return (
    <TableRow
      onClick={handleClick}
      className={cn(
        'cursor-pointer hover:bg-blue-50 transition',
        selected && 'bg-blue-100'
      )}
    >
        <TableCell>{product.code}</TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.price}</TableCell>      
        <TableCell>
                <span
                    className={cn(
                    'inline-block px-2 py-1 text-xs rounded-full font-medium',
                    product.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-700'
                    )}
                >
                    {product.isActive ? 'Ativo' : 'Inativo'}
                </span>
        </TableCell>
        <TableCell align="right">
            <RowActions>
            <button 
                className="w-full px-3 py-2 rounded-md hover:bg-gray-50 text-left"
                onClick={(e) => {
                e.stopPropagation();
                onChangeStatus(product);
                }}
            >
                {product.isActive ? 'Desativar' : 'Ativar'}
            </button>

            <button 
                className="w-full px-3 py-2 rounded-md hover:bg-gray-50 text-left"
                onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
                }}
            >
                Editar
            </button>

            <ConfirmDeleteDialog
                onConfirm={() => onDelete(product)}
                trigger={
                <button
                    className="w-full px-3 py-2 rounded-md hover:bg-red-50 text-left text-red-600"
                    onClick={(e) => e.stopPropagation()}
                >
                    Excluir
                </button>
                }
                title="Excluir produto"
                description={`Tem certeza que deseja excluir ${product.name}?\nEsta ação não poderá ser desfeita.`}
            />
            </RowActions>
        </TableCell>
    </TableRow>
  );
}